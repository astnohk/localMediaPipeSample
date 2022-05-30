# localMediaPipeSample
The MediaPipe 3D pose estimation sample running on offline local server by using npm and yarn.


## Build

Install Node.js and `yarn` by following command: `npm install -g yarn`.  
Move to `localMediaPipeSample` directory and run `yarn` to install requirements.
Build with `npm run build`.


## Run the demo

Start HTTPS server (navigator.mediaDevices only available in secure context) and serve the files in `dist/`.
Allow to access to local WebCamera devices to input the camera stream as sample images.


## TODO

* Sometimes runtime error happened.
