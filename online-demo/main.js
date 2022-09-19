const MEDIAPIPE_MODE = {
    face_mesh: 'face_mesh',
    hands: 'hands',
    pose: 'pose',
    holistic: 'holistic'
};
Object.freeze(MEDIAPIPE_MODE);

const HANDS_LANDMARK_INDICE = {
    wrist: 0,
    thumb: [ 1, 2, 3, 4 ],
    index_finger: [ 5, 6, 7, 8 ],
    middle_finger: [ 9, 10, 11, 12 ],
    ring_finger: [ 13, 14, 15, 16 ],
    little_finger: [ 17, 18, 19, 20 ]
};
Object.freeze(HANDS_LANDMARK_INDICE);

const POSE_LANDMARK_COLORS = [
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
Object.freeze(POSE_LANDMARK_COLORS);

const POSE_LANDMARK_INDICE = {
    nose: 0,
    left_eye_inner: 1,
    left_eye: 2,
    left_eye_outer: 3,
    right_eye_inner: 4,
    right_eye: 5,
    right_eye_outer: 6,
    left_ear: 7,
    right_ear: 8,
    mouth_left: 9,
    mouth_right: 10,
    left_shoulder: 11,
    right_shoulder: 12,
    left_elbow: 13,
    right_elbow: 14,
    left_wrist: 15,
    right_wrist: 16,
    left_pinky: 17,
    right_pinky: 18,
    left_index: 19,
    right_index: 20,
    left_thumb: 21,
    right_thumb: 22,
    left_hip: 23,
    right_hip: 24,
    left_knee: 25,
    right_knee: 26,
    left_ankle: 27,
    right_ankle: 28,
    left_heel: 29,
    right_heel: 30,
    left_foot_index: 31,
    right_foot_index: 32,
};
Object.freeze(POSE_LANDMARK_INDICE);


async function createDetector(mode)
{
	let detector;
    if (mode === MEDIAPIPE_MODE.face_mesh) {
        detector = new FaceMesh({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
            }
        });
    } else if (mode === MEDIAPIPE_MODE.hands) {
        detector = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }
        });
    } else if (mode === MEDIAPIPE_MODE.pose) {
        detector = new Pose({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
            }
        });
        detector.setOptions({
            modelComplexity: 0,
            smoothLandmarks: true,
            enableSegmentation: false,
            smoothSegmentation: false,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });
    } else if (mode === MEDIAPIPE_MODE.holistic) {
        detector = new Holistic({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
            }
        });
        detector.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: false,
            smoothSegmentation: false,
            refineLandmarks: false,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });
    }

	return {
        mode: mode,
        detector: detector
    };
}

async function estimate(model, image)
{
	return new Promise((resolve) => {
		model.detector.onResults((results) => {
			resolve({
                mode: model.mode,
                results: results
            });
		});
		model.detector.send({ image: image });
	});
}

