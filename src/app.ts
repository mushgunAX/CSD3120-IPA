/*
* @filename app.ts
* @author   Ryan Wang, 2000571
* @brief    Holds the implementation of the App class
*/

import {ArcRotateCamera, Color3, CubeTexture, Engine, HemisphericLight, MeshBuilder, PointLight, Scene, StandardMaterial, Texture, UniversalCamera, Vector3} from "babylonjs";
import {AdvancedDynamicTexture, TextBlock} from 'babylonjs-gui';

/*
* The App class, handling the displaying of the XR scene on the website
*/
export class App {
    private engine: Engine;
    private canvas: HTMLCanvasElement;

    /*
    * Constructs an instance of the App class
    * @param engine is the Babylon.js engine that handles low-level tasks
    * @param canvas is the HTML canvas element the app should run and be
    *               displayed on
    */
    constructor(engine: Engine, canvas: HTMLCanvasElement) {
        this.engine = engine,
        this.canvas = canvas;
        //console.log("App is running");
    }

    /*
    * Renders the interactive AR/VR scene when user clicks the "XR Format"
    * button in the XRAuthor Interface
    * @param canvasID is the string ID of the HTMLCanvasElement target to
    *                 render the scene into
    * @param authoringData is a dict of dicts that contains various information
    *                      from other XRAuthor components, e.g., dicts of
    *                      recordingData, editingData, etc. however, this object
    *                      is ignored for now and an initial scene independent
    *                      of authoringData is created for fulfiling A3 criteria
    */
    async createXRScene(
        canvasID: string,
        authoringData: {[dataType: string]: {[key: string]: any}} = {}
    )
    {
        const scene = new Scene(this.engine);
        //scene.createDefaultCameraOrLight();
        this.createCamera(scene);
        this.createLights(scene);
        this.addInspectorKeyboardShortcut(scene);

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
        helloText.text = canvasID;
        helloText.color = "purple";
        helloText.fontSize = 50;
        helloTexture.addControl(helloText); //Pass the helloText into the texture, what the texture will show

        this.createSkybox(scene);

        //XR
        //Async means that this function does not have to finish before calling
        //the next line (return scene)
        //It will continue in the background
        const xr = await scene.createDefaultXRExperienceAsync(
            {
                uiOptions: {
                    //immersive-ar or immersive-vr
                    sessionMode: 'immersive-vr'
                }
            }
        );

        //Only for debugging purposes (Pass XR into window)
        //(window as any).xr = xr;


        //End with this
        return scene;
    }

    //COMMENT
    //Create a specialised camera for the scene
    createCamera(scene: Scene)
    {
        //const camera = new ArcRotateCamera("arcCamera", -Math.PI / 5, Math.PI / 2, 5, Vector3.Zero(), scene);
        const camera = new UniversalCamera("uniCamera", new Vector3(0, 0, -5), scene);
        camera.attachControl(this.canvas, true);
    }

    //COMMENT
    //Create a light
    createLights(scene: Scene)
    {
        //Hemispheric Light is ambient light
        /*const hemiLight = new HemisphericLight("hemiLight", Vector3.Up(), scene);
        hemiLight.intensity = 1.0;
        hemiLight.diffuse = new Color3(1.0, 0.8, 0.8)*/

        const pointLight = new PointLight("pointLight", new Vector3(), scene);
        pointLight.intensity = 0.5;
        pointLight.diffuse = new Color3(1.0, 0.9, 0.5);
    }

    //COMMENT
    //Create a skybox for the scene
    createSkybox(scene: Scene) 
    {
        const skybox = MeshBuilder.CreateBox('skybox', {size: 1000}, scene);
        const skyboxMaterial = new StandardMaterial('skybox-mat');

        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new CubeTexture('assets/textures/skybox', scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
        skyboxMaterial.specularColor = new Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
    }

    //COMMENT
    addInspectorKeyboardShortcut(scene: Scene)
    {
        window.addEventListener("keydown", e => {
            if (e.ctrlKey && e.altKey && e.key === "i")
            {
                //=== operator is strict equality, which also checks for type
                //CTRL + ALT + I
                if (scene.debugLayer.isVisible())
                {
                    scene.debugLayer.hide();
                }
                else
                {
                    scene.debugLayer.show();
                }
            }
        })
    }
}