import {Engine} from "babylonjs";
import {App} from "./app";

//webglfundamentals.org (though Babylon.js will do the low-level graphics for you instead)

//console.log('hello XR');

const canvas:HTMLCanvasElement = document.getElementById('renderCanvas') as HTMLCanvasElement;
//const ctx = canvas.getContext('2d');
//ctx.font = '50px Arial';
//ctx.fillText("Hello XR", 50, 50);

const engine = new Engine(canvas, true);

const app = new App(engine, canvas);

const scenePromise = app.createScene();

//This below cannot be use as scene is async
//const scene = app.createScene();
//Lambda expression
/*engine.runRenderLoop(() => {
    scene.render();
})*/

scenePromise.then(scene => {
    engine.runRenderLoop(() => {
        scene.render();
    })
});