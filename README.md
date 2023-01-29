# CSD3120-IPA
_Wang Nian Jing, Ryan - 2000571_

## Architecture
`assets` folder contains auxiliary models and videos for the purpose for this assignment.

`dist` folder contains html and js files that are automatically generated by the webpack.

`src` folder contains manually-written code that handles the implementation for this project.

`.gitignore` is for ignoring certain files when committing to source control. The `node_modules` folder is ignored and the next section details how to get the relevant dependcies for setting up the web app.

`package.json` is the JSON file listing the details of this project and its dependencies along with scripts that could be run through npm.

`package-lock.json` is the automatically-generated JSON file that contains more information and should not be directly edited.

`README.md` is this file you are reading.

`tsconfig.json` is the configuration file for transpiling from written TS code into JS code.

`Video Script.txt` is the script for the video inside `assets`.

`webpack.config.js` is the configuration file for the webpack.

## Setup for dependecies and starting up
Make sure to do these commands **in order** on your Linux CLI in the root directory of this project folder:
    * Install npm by `npm install -g npm`
    * Install babylonjs by `npm install --save babylonjs`
    * Install webpack dependecies by `npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin`
    * Install typescript dependecies by `npm install --save-dev typescript ts-loader`
    * Install babylonjs GUI by `npm install --save babylonjs-gui`
    * Inside the package.json file, add this code snippet into the "scripts` section:
    `"scripts": { "test": "echo \"Error: no test specified\" && exit 1", "build": "webpack", "serve": "webpack serve", "start": "webpack serve --open"},`
    * Type `npm run build` to build the server
    * Type `npm run serve` to start running the server that hosts the web app, which could be accessed through the URL `localhost:3000` (Make sure that nothing else on your computer is using the port 3000)
    * Press Ctrl+C twice to stop the server once you are done using it.

## Video link
`assets/Reaction to form water/videos/0.webm`