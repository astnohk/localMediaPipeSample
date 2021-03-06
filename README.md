# localMediaPipeSample
The MediaPipe 3D pose estimation sample running on offline local server by using npm and yarn.


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

Build with following command:
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


## TODO

