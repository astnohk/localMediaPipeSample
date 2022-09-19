/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var mediapipe_interface;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"HANDS_LANDMARK_INDICE\": () => (/* binding */ HANDS_LANDMARK_INDICE),\n/* harmony export */   \"MEDIAPIPE_MODE\": () => (/* binding */ MEDIAPIPE_MODE),\n/* harmony export */   \"POSE_LANDMARK_COLORS\": () => (/* binding */ POSE_LANDMARK_COLORS),\n/* harmony export */   \"POSE_LANDMARK_INDICE\": () => (/* binding */ POSE_LANDMARK_INDICE),\n/* harmony export */   \"createDetector\": () => (/* binding */ createDetector),\n/* harmony export */   \"estimate\": () => (/* binding */ estimate)\n/* harmony export */ });\n//import '@mediapipe/face_mesh';\r\n//import '@mediapipe/hands';\r\n//import '@mediapipe/pose';\r\n//import '@mediapipe/holistic';\r\n\r\n\r\nconst MEDIAPIPE_MODE = {\r\n    face_mesh: 'face_mesh',\r\n    hands: 'hands',\r\n    pose: 'pose',\r\n    holistic: 'holistic'\r\n};\r\nObject.freeze(MEDIAPIPE_MODE);\r\n\r\nconst HANDS_LANDMARK_INDICE = {\r\n    wrist: 0,\r\n    thumb: [ 1, 2, 3, 4 ],\r\n    index_finger: [ 5, 6, 7, 8 ],\r\n    middle_finger: [ 9, 10, 11, 12 ],\r\n    ring_finger: [ 13, 14, 15, 16 ],\r\n    little_finger: [ 17, 18, 19, 20 ]\r\n};\r\nObject.freeze(HANDS_LANDMARK_INDICE);\r\n\r\nconst POSE_LANDMARK_COLORS = [\r\n    [ 255, 255, 255 ], // nose\r\n    [ 255, 0, 0 ], // left_eye_inner\r\n    [ 255, 96, 96 ], // left_eye\r\n    [ 255, 0, 0 ], // left_eye_outer\r\n    [ 0, 0, 255 ], // right_eye_inner\r\n    [ 96, 96, 255 ], // right_eye\r\n    [ 0, 0, 255 ], // right_eye_outer\r\n    [ 255, 0, 0 ], // left_ear\r\n    [ 0, 0, 255 ], // right_ear\r\n    [ 255, 255, 128 ], // mouth_left\r\n    [ 128, 255, 255 ], // mouth_right\r\n    [ 255, 0, 0 ], // left_shoulder\r\n    [ 0, 0, 255 ], // right_shoulder\r\n    [ 255, 0, 0 ], // left_elbow\r\n    [ 0, 0, 255 ], // right_elbow\r\n    [ 255, 0, 0 ], // left_wrist\r\n    [ 0, 0, 255 ], // right_wrist\r\n    [ 255, 0, 0 ], // left_pinky\r\n    [ 0, 0, 255 ], // right_pinky\r\n    [ 255, 0, 0 ], // left_index\r\n    [ 0, 0, 255 ], // right_index\r\n    [ 255, 0, 0 ], // left_thumb\r\n    [ 0, 0, 255 ], // right_thumb\r\n    [ 255, 0, 0 ], // left_hip\r\n    [ 0, 0, 255 ], // right_hip\r\n    [ 255, 0, 0 ], // left_knee\r\n    [ 0, 0, 255 ], // right_knee\r\n    [ 255, 0, 0 ], // left_ankle\r\n    [ 0, 0, 255 ], // right_ankle\r\n    [ 255, 0, 0 ], // left_heel\r\n    [ 0, 0, 255 ], // right_heel\r\n    [ 255, 0, 0 ], // left_foot_index\r\n    [ 0, 0, 255 ], // right_foot_index\r\n];\r\nObject.freeze(POSE_LANDMARK_COLORS);\r\n\r\nconst POSE_LANDMARK_INDICE = {\r\n    nose: 0,\r\n    left_eye_inner: 1,\r\n    left_eye: 2,\r\n    left_eye_outer: 3,\r\n    right_eye_inner: 4,\r\n    right_eye: 5,\r\n    right_eye_outer: 6,\r\n    left_ear: 7,\r\n    right_ear: 8,\r\n    mouth_left: 9,\r\n    mouth_right: 10,\r\n    left_shoulder: 11,\r\n    right_shoulder: 12,\r\n    left_elbow: 13,\r\n    right_elbow: 14,\r\n    left_wrist: 15,\r\n    right_wrist: 16,\r\n    left_pinky: 17,\r\n    right_pinky: 18,\r\n    left_index: 19,\r\n    right_index: 20,\r\n    left_thumb: 21,\r\n    right_thumb: 22,\r\n    left_hip: 23,\r\n    right_hip: 24,\r\n    left_knee: 25,\r\n    right_knee: 26,\r\n    left_ankle: 27,\r\n    right_ankle: 28,\r\n    left_heel: 29,\r\n    right_heel: 30,\r\n    left_foot_index: 31,\r\n    right_foot_index: 32,\r\n};\r\nObject.freeze(POSE_LANDMARK_INDICE);\r\n\r\n\r\nasync function createDetector(mode)\r\n{\r\n\tlet detector;\r\n    if (mode === MEDIAPIPE_MODE.face_mesh) {\r\n        detector = new FaceMesh({\r\n            locateFile: (file) => {\r\n                return `../node_modules/@mediapipe/face_mesh/${file}`;\r\n            }\r\n        });\r\n    } else if (mode === MEDIAPIPE_MODE.hands) {\r\n        detector = new Hands({\r\n            locateFile: (file) => {\r\n                return `../node_modules/@mediapipe/hands/${file}`;\r\n            }\r\n        });\r\n    } else if (mode === MEDIAPIPE_MODE.pose) {\r\n        detector = new Pose({\r\n            locateFile: (file) => {\r\n                return `../node_modules/@mediapipe/pose/${file}`;\r\n            }\r\n        });\r\n        detector.setOptions({\r\n            modelComplexity: 0,\r\n            smoothLandmarks: true,\r\n            enableSegmentation: false,\r\n            smoothSegmentation: false,\r\n            minDetectionConfidence: 0.5,\r\n            minTrackingConfidence: 0.5,\r\n        });\r\n    } else if (mode === MEDIAPIPE_MODE.holistic) {\r\n        detector = new Holistic({\r\n            locateFile: (file) => {\r\n                return `../node_modules/@mediapipe/holistic/${file}`;\r\n            }\r\n        });\r\n        detector.setOptions({\r\n            modelComplexity: 1,\r\n            smoothLandmarks: true,\r\n            enableSegmentation: false,\r\n            smoothSegmentation: false,\r\n            refineLandmarks: false,\r\n            minDetectionConfidence: 0.5,\r\n            minTrackingConfidence: 0.5,\r\n        });\r\n    }\r\n\r\n\treturn {\r\n        mode: mode,\r\n        detector: detector\r\n    };\r\n}\r\n\r\nasync function estimate(model, image)\r\n{\r\n\treturn new Promise((resolve) => {\r\n\t\tmodel.detector.onResults((results) => {\r\n\t\t\tresolve({\r\n                mode: model.mode,\r\n                results: results\r\n            });\r\n\t\t});\r\n\t\tmodel.detector.send({ image: image });\r\n\t});\r\n}\r\n\r\n\n\n//# sourceURL=webpack://mediapipe_interface/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	mediapipe_interface = __webpack_exports__;
/******/ 	
/******/ })()
;