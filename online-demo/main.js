
let rotMat = [
	1.0, 0.0, 0.0, 0.0,
	0.0, 1.0, 0.0, 0.0,
	0.0, 0.0, 1.0, 0.0,
	0.0, 0.0, 0.0, 1.0
];

function createDetector()
{
	const model = new Pose({ locateFile: (file) => {
			return 'https://cdn.jsdelivr.net/npm/@mediapipe/pose/' + file;
		}
	});
	model.setOptions({
		modelComplexity: 1,
		smoothLandmarks: true,
		enableSegmentation: true,
		smoothSegmentation: true,
		minDetectionConfidence: 0.5,
		minTrackingConfidence: 0.5
	});

	return model;
}

async function estimate(model, image)
{
	return new Promise((resolve) => {
		model.onResults((results) => {
			console.log(results);
			resolve(results);
		});

		model.send({ image: image });
	});
}


function drawPose(ctx, poses)
{
	const color = [
		[ 255, 255, 255 ], // nose
		[ 255, 0, 0 ], // left_eye_inner
		[ 255, 96, 96 ], // left_eye
		[ 255, 0, 0 ], // left_eye_outer
		[ 0, 0, 255 ], // right_eye_inner
		[ 96, 96, 255 ], // right_eye
		[ 0, 0, 255 ], // right_eye_outer
		[ 255, 0, 0 ], // left_ear
		[ 0, 0, 255 ], // right_ear
		[ 255, 255, 128 ], // mouth_left
		[ 128, 255, 255 ], // mouth_right
		[ 255, 0, 0 ], // left_shoulder
		[ 0, 0, 255 ], // right_shoulder
		[ 255, 0, 0 ], // left_elbow
		[ 0, 0, 255 ], // right_elbow
		[ 255, 0, 0 ], // left_wrist
		[ 0, 0, 255 ], // right_wrist
		[ 255, 0, 0 ], // left_pinky
		[ 0, 0, 255 ], // right_pinky
		[ 255, 0, 0 ], // left_index
		[ 0, 0, 255 ], // right_index
		[ 255, 0, 0 ], // left_thumb
		[ 0, 0, 255 ], // right_thumb
		[ 255, 0, 0 ], // left_hip
		[ 0, 0, 255 ], // right_hip
		[ 255, 0, 0 ], // left_knee
		[ 0, 0, 255 ], // right_knee
		[ 255, 0, 0 ], // left_ankle
		[ 0, 0, 255 ], // right_ankle
		[ 255, 0, 0 ], // left_heel
		[ 0, 0, 255 ], // right_heel
		[ 255, 0, 0 ], // left_foot_index
		[ 0, 0, 255 ], // right_foot_index
	];
	const w = ctx.canvas.width;
	const h = ctx.canvas.height;
	const scale = 180;

	// Background
	ctx.fillStyle = 'rgb(0,0,0)';
	ctx.fillRect(0, 0, w, h);

	// Draw
	if (!! poses.poseLandmarks) {
		const pose = poses.poseLandmarks
		for (let i = 0; i < 33; ++i) {
			ctx.fillStyle = 'rgb(' +
				color[i][0] + ',' +
				color[i][1] + ',' +
				color[i][2] + ')';
			let r = [
				pose[i].x,
				pose[i].y,
				pose[i].z,
				1.0 ];
			mat4_mult_vec4(r, rotMat, r);
			const x = w * 0.5 + r[0] * scale;
			const y = h * 0.5 + r[1] * scale;
			ctx.fillRect(x - 1, y - 1, 3, 3);
		}
	}

	ctx.font = '10px sans-serif';
	ctx.fillStyle = 'rgb(255,128,128)';
}

function addMouseListener(canvas)
{
	let drad = 0.01;
	let dshift = 0.01
	let px = 0;
	let py = 0;
	let scale = 1.0;
	let rot_x = 0;
	let rot_y = 0;
	let shift_x = 0;
	let shift_y = 0;

	canvas.addEventListener(
		'mousedown',
		(e) => {
			px = e.clientX;
			py = e.clientY;
		});
	canvas.addEventListener(
		'mousemove',
		(e) => {
			if ((e.buttons & 0x01) > 0) {
				rot_x += (e.clientY - py) * drad;
				rot_y -= (e.clientX - px) * drad;
			} else if ((e.buttons & 0x02) > 0) {
				shift_x += (e.clientX - px) * dshift;
				shift_y += (e.clientY - py) * dshift;
			}
			updateRotMat(scale, [ rot_x, rot_y, 0 ], [ shift_x, shift_y ]);
			px = e.clientX;
			py = e.clientY;
		});
	canvas.addEventListener(
		'wheel',
		(e) => {
			scale *= e.deltaY > 0 ? 1/1.2 : 1.2;
			updateRotMat(scale, [ rot_x, rot_y, 0 ], [ shift_x, shift_y ]);
		});
}

function updateRotMat(scale, rot, shift)
{
	const cosx = Math.cos(rot[0]);
	const sinx = Math.sin(rot[0]);
	const cosy = Math.cos(rot[1]);
	const siny = Math.sin(rot[1]);
	const cosz = Math.cos(rot[2]);
	const sinz = Math.sin(rot[2]);
	// 1 0 0
	// 0 c -s
	// 0 s c
	// c  0 s
	// 0  1 0
	// -s 0 c
	rotMat[0] = cosy * scale;
	rotMat[4] = siny * sinx * scale;
	rotMat[8] = siny * cosx * scale;
	rotMat[1] = 0.0;
	rotMat[5] = cosx * scale;
	rotMat[9] = -sinx * scale;
	rotMat[2] = -siny * scale;
	rotMat[6] = cosy * sinx * scale;
	rotMat[10] = cosy * cosx * scale;

	rotMat[3] = 0.0;
	rotMat[7] = 0.0;
	rotMat[11] = 0.0;
	rotMat[12] = shift[0];
	rotMat[13] = shift[1];
	rotMat[14] = 0.0;
	rotMat[15] = 1.0;
}

function mat4_mult_vec4(out, A, b)
{
	const	A11 = A[0], A12 = A[4], A13 = A[8], A14 = A[12],
		A21 = A[1], A22 = A[5], A23 = A[9], A24 = A[13],
		A31 = A[2], A32 = A[6], A33 = A[10], A34 = A[14],
		A41 = A[3], A42 = A[7], A43 = A[11], A44 = A[15];
	const b1 = b[0], b2 = b[1], b3 = b[2], b4 = b[3];
	out[0] = A11 * b1 + A12 * b2 + A13 * b3 + A14 * b4;
	out[1] = A21 * b1 + A22 * b2 + A23 * b3 + A24 * b4;
	out[2] = A31 * b1 + A32 * b2 + A33 * b3 + A34 * b4;
	out[3] = A41 * b1 + A42 * b2 + A43 * b3 + A44 * b4;
}


async function main()
{
	// Get image
	//const image = document.getElementById('inputImage');
	// Get media
	const media = await navigator.mediaDevices.getUserMedia({ video: true });
	console.log(media);
	const video = document.getElementById('inputVideo');
	video.srcObject = media;

	// Moels
	const detector = await createDetector();

	// Output
	const output = document.getElementById('outputCanvas');
	setCanvasSizeFromCurrentStyle(output);
	addMouseListener(output)

	let count = 0;
	const render = async () => {
		const poses = await estimate(detector, video);
		console.log(poses);
		count += 1;

		const ctx = output.getContext('2d');
		drawPose(ctx, poses, { frameNum: count });

		requestAnimationFrame(render);
	};
	// Start render
	requestAnimationFrame(render);
}

function setCanvasSizeFromCurrentStyle(canvas)
{
	const style = canvas.getBoundingClientRect();
	canvas.width = style.width;
	canvas.height = style.height;
}



// Entrypoint
window.onload = main;

