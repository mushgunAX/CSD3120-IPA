import {Engine, MeshBuilder, Scene} from "babylonjs";
import {AdvancedDynamicTexture, TextBlock} from 'babylonjs-gui';

export class App {
    private engine: Engine;
    private canvas: HTMLCanvasElement;

    constructor(engine: Engine, canvas: HTMLCanvasElement) {
        this.engine = engine,
        this.canvas = canvas;
        //console.log("App is running");
    }

    async createScene()
    {
        const scene = new Scene(this.engine);
        scene.createDefaultCameraOrLight();

        //Sphere
        const sphere = MeshBuilder.CreateSphere('sphere', {diameter: 1.3}, scene);
        sphere.position.y = 1;
        sphere.position.z = 5;

        //Hello text
        const helloPlane = MeshBuilder.CreatePlane('hello plane', {size: 15});
        helloPlane.position.y = 0;
        helloPlane.position.z = 5;
        const helloTexture = AdvancedDynamicTexture.CreateForMesh(helloPlane);
        const helloText = new TextBlock("hello");
        helloText.text = "Hello XR";
        helloText.color = "purple";
        helloText.fontSize = 50;
        helloTexture.addControl(helloText); //Pass the helloText into the texture, what the texture will show

        //XR
        //Async means that this function does not have to finish before calling
        //the next line (return scene)
        //It will continue in the background
        const xr = await scene.createDefaultXRExperienceAsync(
            {
                uiOptions: {
                    //immersive-ar or immersive-vr
                    sessionMode: 'immersive-ar'
                }
            }
        );

        //Only for debugging purposes (Pass XR into window)
        //(window as any).xr = xr;


        //End with this
        return scene;
    }
}