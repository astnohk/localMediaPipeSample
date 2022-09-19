'use strict';

let DRAW_INPUT_IMAGE = false;


function draw(ctx, rotMat, result)
{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (DRAW_INPUT_IMAGE &&
        !! result.results.image)
    {
        ctx.drawImage(
            result.results.image,
            0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    if (result.mode === mediapipe_interface.MEDIAPIPE_MODE.face_mesh) {
        if (!! result.results.multiFaceLandmarks) {
            result.results.multiFaceLandmarks.forEach((landmarks) => {
                drawLandmarks(ctx, rotMat, landmarks, [ 255, 0, 255, 1.0 ], 3);
            });
        }
    } else if (result.mode === mediapipe_interface.MEDIAPIPE_MODE.hands) {
        if (!! result.results.multiHandLandmarks) {
            result.results.multiHandLandmarks.forEach((landmarks) => {
                drawHandBones(ctx, rotMat, landamarks, [ 255, 0, 255, 0.75 ]);
                drawLandmarks(ctx, rotMat, landmarks, [ 255, 0, 255, 1.0 ], 3);
            });
        }
    } else if (result.mode === mediapipe_interface.MEDIAPIPE_MODE.pose) {
        if (!! result.results.poseLandmarks) {
            drawPoseLandmarks(ctx, rotMat, result.results.poseLandmarks);
        }
    } else if (result.mode === mediapipe_interface.MEDIAPIPE_MODE.holistic) {
        if (!! result.results.poseLandmarks) {
            drawPoseBones(ctx, rotMat, result.results.poseLandmarks);
            drawPoseLandmarks(ctx, rotMat, result.results.poseLandmarks);
        }

        if (!! result.results.faceLandmarks) {
            drawLandmarks(ctx, rotMat, result.results.faceLandmarks, [ 255, 0, 255, 0.9 ], 2);
        }

        if (!! result.results.leftHandLandmarks) {
            const lcol = mediapipe_interface.POSE_LANDMARK_COLORS[mediapipe_interface.POSE_LANDMARK_INDICE.left_wrist];
            drawHandBones(ctx, rotMat, result.results.leftHandLandmarks, [ lcol[0], lcol[1], lcol[2], 0.5 ]);
            drawLandmarks(ctx, rotMat, result.results.leftHandLandmarks, [ lcol[0], lcol[1], lcol[2], 0.9 ], 3);
        }
        if (!! result.results.rightHandLandmarks) {
            const rcol = mediapipe_interface.POSE_LANDMARK_COLORS[mediapipe_interface.POSE_LANDMARK_INDICE.right_wrist];
            drawHandBones(ctx, rotMat, result.results.rightHandLandmarks, [ rcol[0], rcol[1], rcol[2], 0.5 ]);
            drawLandmarks(ctx, rotMat, result.results.rightHandLandmarks, [ rcol[0], rcol[1], rcol[2], 0.9 ], 3);
        }
    }
}

function drawLandmarks(ctx, rotMat, landmarks, rgba, dotSize)
{
	const w = ctx.canvas.width;
	const h = ctx.canvas.height;

	// Draw
    ctx.fillStyle = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
    for (let i = 0; i < landmarks.length; ++i) {
        let r = [
            landmarks[i].x,
            landmarks[i].y,
            landmarks[i].z,
            1.0 ];
        mat4_mult_vec4(r, rotMat, r);
        const x = w * r[0];
        const y = h * r[1];
        ctx.fillRect(x - 0.5 * dotSize, y - 0.5 * dotSize, dotSize, dotSize);
    }
}

function drawHandBones(ctx, rotMat, landmarks, rgba)
{
    const lineWidth = ctx.lineWidth;

    const indice = mediapipe_interface.HANDS_LANDMARK_INDICE;
	const w = ctx.canvas.width;
	const h = ctx.canvas.height;

    const getPosition = (landmark, rot) => {
        let r = [
            landmark.x,
            landmark.y,
            landmark.z,
            1.0 ];
        mat4_mult_vec4(r, rot, r);
        return r;
    };
    const lineTo = (ind) => {
        r = getPosition(landmarks[ind], rotMat);
        ctx.lineTo(w * r[0], h * r[1]);
    };

	// Draw
    let r;
    ctx.strokeStyle = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
    ctx.lineWidth = 3;
    //// Thumb
    ctx.beginPath();
    r = getPosition(landmarks[indice.wrist], rotMat);
    ctx.moveTo(w * r[0], h * r[1]);
    indice.thumb.forEach((ind) => {
        r = getPosition(landmarks[ind], rotMat);
        ctx.lineTo(w * r[0], h * r[1]);
    });
    ctx.stroke();
    //// Index finger
    ctx.beginPath();
    r = getPosition(landmarks[indice.wrist], rotMat);
    ctx.moveTo(w * r[0], h * r[1]);
    indice.index_finger.forEach(lineTo);
    ctx.stroke();
    //// Middle finger
    ctx.beginPath();
    r = getPosition(landmarks[indice.wrist], rotMat);
    ctx.moveTo(w * r[0], h * r[1]);
    indice.middle_finger.forEach(lineTo);
    ctx.stroke();
    //// Ring finger
    ctx.beginPath();
    r = getPosition(landmarks[indice.wrist], rotMat);
    ctx.moveTo(w * r[0], h * r[1]);
    indice.ring_finger.forEach(lineTo);
    ctx.stroke();
    //// little finger
    ctx.beginPath();
    r = getPosition(landmarks[indice.wrist], rotMat);
    ctx.moveTo(w * r[0], h * r[1]);
    indice.little_finger.forEach(lineTo);
    ctx.stroke();

    // Reset line width
    ctx.lineWidth = lineWidth;
}

function drawPoseLandmarks(ctx, rotMat, landmarks)
{
    const color = mediapipe_interface.POSE_LANDMARK_COLORS;
	const w = ctx.canvas.width;
	const h = ctx.canvas.height;
    const dotSize = 5;

	// Draw
    for (let i = 0; i < 33; ++i) {
        ctx.fillStyle = `rgb(${color[i][0]}, ${color[i][1]}, ${color[i][2]})`;
        let r = [
            landmarks[i].x,
            landmarks[i].y,
            landmarks[i].z,
            1.0 ];
        mat4_mult_vec4(r, rotMat, r);
        const x = w * r[0];
        const y = h * r[1];
        ctx.fillRect(x - 0.5 * dotSize, y - 0.5 * dotSize, dotSize, dotSize);
    }
}

function drawPoseBones(ctx, rotMat, landmarks)
{
    const lineWidthOrig = ctx.lineWidth;
    ctx.lineWidth = 10;
    const color = mediapipe_interface.POSE_LANDMARK_COLORS;
    const indice = mediapipe_interface.POSE_LANDMARK_INDICE;
	const w = ctx.canvas.width;
	const h = ctx.canvas.height;
    const dotSize = 5;

    // Draw bones
    const getLinePosition = (ind) => {
        let r = [ 0, 0, 0, 1.0 ];
        ctx.strokeStyle = `rgba(${color[ind][0]},${color[ind][1]},${color[ind][2]},0.3)`;
        r = [ landmarks[ind].x, landmarks[ind].y, landmarks[ind].z, 1.0 ];
        mat4_mult_vec4(r, rotMat, r);
        const x = w * r[0];
        const y = h * r[1];
        return { x, y };
    };
    let res = null;
    // Right side
    ctx.beginPath();
    //// Arm
    res = getLinePosition(indice.right_shoulder);
    ctx.moveTo(res.x, res.y);
    res = getLinePosition(indice.right_elbow);
    ctx.lineTo(res.x, res.y);
    res = getLinePosition(indice.right_wrist);
    ctx.lineTo(res.x, res.y);
    //// Leg
    res = getLinePosition(indice.right_hip);
    ctx.moveTo(res.x, res.y);
    res = getLinePosition(indice.right_knee);
    ctx.lineTo(res.x, res.y);
    res = getLinePosition(indice.right_ankle);
    ctx.lineTo(res.x, res.y);
    ctx.stroke();
    // Left side
    ctx.beginPath();
    //// Arm
    res = getLinePosition(indice.left_shoulder);
    ctx.moveTo(res.x, res.y);
    res = getLinePosition(indice.left_elbow);
    ctx.lineTo(res.x, res.y);
    res = getLinePosition(indice.left_wrist);
    ctx.lineTo(res.x, res.y);
    //// Leg
    res = getLinePosition(indice.left_hip);
    ctx.moveTo(res.x, res.y);
    res = getLinePosition(indice.left_knee);
    ctx.lineTo(res.x, res.y);
    res = getLinePosition(indice.left_ankle);
    ctx.lineTo(res.x, res.y);
    ctx.stroke();

    // Reset line width
    ctx.lineWidth = lineWidthOrig;
}

