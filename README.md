# localMediaPipeSample
The MediaPipe (https://google.github.io/mediapipe/) samples runs on offline local server using npm and yarn.

It includes `Face Mesh`, `Hands`, `Pose` and `Holistic` samples (using holistic estimation by default).
You could see superimposed landmarks and bones on input camera image.


## Get Started

### Install tools

Install Node.js.
Next, install `yarn` as package manager and `live-server` as HTTP server by following command:
```
$ npm install -g yarn live-server
```

Move to `localMediaPipeSample` directory and run the command below to install requirements.
```
$ yarn -i
```


### Build

This repository includes built library file `main.js` so you could start demo without building.

You could build from the source with following command:
```
$ npm run build
```


## Run the demo

Start HTTPS server (navigator.mediaDevices only available in secure context, TLS) and serve the files in `dist/`.
Allow to access to local WebCamera devices to input the camera stream.

Start demo with `live-server` by following command:
```
$ npm start
```
Your default browser will open and shows files of the project directory. You can start the demo by opening `dist/`.
You will face invalid certificate error because the `live-server` uses locally-signed certificate.


## Modify the demo

`dist/index.html` includes flags to switch the detector.
You could choose detector by changing `mediapipe_interface.MEDIAPIPE_MODE.holistic` as below;
* `face_mesh`
* `hands`
* `pose`
* `holistic`


## TODO

