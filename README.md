# CSD3120-IPA
_Wang Nian Jing, Ryan - 2000571_

## Architecture

**For both IPAs**

`README.md` is this file you are reading.

`.gitignore` is for ignoring certain files when committing to source control. The `node_modules` folder is ignored and the next section details how to get the relevant dependcies for setting up the web app.

**IPA A**

`assets` folder contains auxiliary models and videos.

`dist` folder contains html and js files that are automatically generated by the webpack.

`src` folder contains manually-written code that handles the implementation for this project.

`package.json` is the JSON file listing the details of this project and its dependencies along with scripts that could be run through npm.

`package-lock.json` is the automatically-generated JSON file that contains more information and should not be directly edited.

`tsconfig.json` is the configuration file for transpiling from written TS code into JS code.

`Video Script.txt` is the script for the video inside `assets`.

`webpack.config.js` is the configuration file for the webpack.

**IPA B**
`Build` folder contains binary data for the web XR application.

`StreamingAssets` folder contains a JSON of configurations for the application.

`TemplateData` folder contains various assets that define the look of the application website.

`index.html` is the file for the website itself.

These files have been automatically generated by Unity and **should not** be modified.

## Setup for dependecies (IPA A)
Make sure to do these commands **in order** on your Linux CLI in the root directory of this project folder:

Install npm by `npm install -g npm`

Install babylonjs by `npm install --save babylonjs`

Install webpack dependecies by `npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin`

Install typescript dependecies by `npm install --save-dev typescript ts-loader`

Install babylonjs GUI by `npm install --save babylonjs-gui`

Install babylonjs materials by `npm install --save babylonjs-materials`

Install babylonjs loaders so that GLB/GLTF models, which this application uses, can be loaded `npm install --save babylonjs-loaders`

Install copy webpack plugin by `npm install --save copy-webpack-plugin -D`

## Starting up (IPA A)

Inside the `package.json` file, add this code snippet into the `scripts` section:
       `"scripts": { "test": "echo \"Error: no test specified\" && exit 1", "build": "webpack", "serve": "webpack serve", "start": "webpack serve --open"},`

Type `npm run build` to build the server

Type `npm run serve` to start running the server that hosts the web app, which could be accessed through the URL `localhost:3000` (Make sure that nothing else on your computer is using the port 3000)

Press **Ctrl + C** twice to stop the server once you are done using it.

## Video link (IPA A)
`assets/Reaction to form water/videos/0.webm`

## Application link (IPA B)
