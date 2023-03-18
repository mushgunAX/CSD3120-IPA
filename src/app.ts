/*
* @filename app.ts
* @author   Ryan Wang, 2000571
* @brief    Holds the implementation of the App class
*/

import * as babylonjs from "babylonjs"
import * as babylonjsgui from 'babylonjs-gui'
import 'babylonjs-loaders'

/*
* The App class, handling the displaying of the XR scene on the website
*/
export class App {
    private engine: babylonjs.Engine
    private canvas: HTMLCanvasElement

    /*
    * Constructs an instance of the App class
    * @param engine is the Babylon.js engine that handles low-level tasks
    * @param canvas is the HTML canvas element the app should run and be
    *               displayed on
    */
    constructor(engine: babylonjs.Engine, canvas: HTMLCanvasElement) {
        this.engine = engine,
        this.canvas = canvas
        //console.log("App is running")
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
        const scene = new babylonjs.Scene(this.engine)
        //scene.createDefaultCameraOrLight()
        this.createCamera(scene)
        this.createLights(scene)
        this.addInspectorKeyboardShortcut(scene)

        //Sphere
        const sphere = babylonjs.MeshBuilder.CreateSphere('sphere', {diameter: 1.3}, scene)
        sphere.position.y = 1
        sphere.position.z = 5

        //Model
        this.loadModel(scene)
        
        //Sound
        this.addSounds(scene)

        //Particles
        this.createParticles(scene)

        //Hello text
        this.createText(scene)

        this.createSkybox(scene)

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
        )

        //Only for debugging purposes (Pass XR into window)
        //(window as any).xr = xr


        //End with this
        return scene
    }

    //COMMENT
    //Create a specialised camera for the scene
    createCamera(scene: babylonjs.Scene)
    {
        //const camera = new ArcRotateCamera("arcCamera", -Math.PI / 5, Math.PI / 2, 5, Vector3.Zero(), scene)
        const camera = new babylonjs.UniversalCamera("uniCamera", new babylonjs.Vector3(0, 0, -5), scene)
        camera.attachControl(this.canvas, true)
    }

    //COMMENT
    //Create a light
    createLights(scene: babylonjs.Scene)
    {
        //Hemispheric Light is ambient light
        const hemiLight = new babylonjs.HemisphericLight("hemiLight", new babylonjs.Vector3(0.0, 1.0, 0.0), scene)
        hemiLight.intensity = 1.0
        hemiLight.diffuse = new babylonjs.Color3(1.0, 0.9, 0.8)

        /*const pointLight = new PointLight("pointLight", new Vector3(), scene)
        pointLight.intensity = 0.5
        pointLight.diffuse = new Color3(1.0, 0.9, 0.5)*/
    }

    //COMMENT
    //Create a skybox for the scene
    createSkybox(scene: babylonjs.Scene) 
    {
        const skybox = babylonjs.MeshBuilder.CreateBox('skybox', {size: 1000}, scene)
        const skyboxMaterial = new babylonjs.StandardMaterial('skybox-mat')

        skyboxMaterial.backFaceCulling = false
        skyboxMaterial.reflectionTexture = new babylonjs.CubeTexture('assets/textures/skybox', scene)
        skyboxMaterial.reflectionTexture.coordinatesMode = babylonjs.Texture.SKYBOX_MODE
        skyboxMaterial.diffuseColor = new babylonjs.Color3(0, 0, 0)
        skyboxMaterial.specularColor = new babylonjs.Color3(0, 0, 0)
        skybox.material = skyboxMaterial
    }

    //COMMENT
    addInspectorKeyboardShortcut(scene: babylonjs.Scene)
    {
        window.addEventListener("keydown", e => {
            if (e.ctrlKey && e.altKey && e.key === "i")
            {
                //=== operator is strict equality, which also checks for type
                //CTRL + ALT + I
                if (scene.debugLayer.isVisible())
                {
                    scene.debugLayer.hide()
                }
                else
                {
                    scene.debugLayer.show()
                }
            }
        })
    }

    //COMMENT
    loadModel(scene: babylonjs.Scene)
    {
        babylonjs.SceneLoader.ImportMeshAsync("", "assets/models/", "h2o.glb", scene).then(result => {
            const root = result.meshes[0]
            root.id = "h2oRoot"
            root.name = "h2oRoot"
            root.position.y = -1
            root.rotation = new babylonjs.Vector3(0, 0, Math.PI)
            root.scaling.setAll(1.5)
            this.createAnimation(scene, root)
        })
    }

    //COMMENT
    createAnimation(scene: babylonjs.Scene, model: babylonjs.AbstractMesh)
    {
        const animation = new babylonjs.Animation(
            "rotationAnimation",
            "rotation",
            -10.0,
            babylonjs.Animation.ANIMATIONTYPE_VECTOR3,
            babylonjs.Animation.ANIMATIONLOOPMODE_CYCLE
        )
        const keyframes = [
            {frame: 0, value: new babylonjs.Vector3(0, 0, 0)},
            {frame: 30, value: new babylonjs.Vector3(0, 2 * Math.PI, 0)}
        ]
        animation.setKeys(keyframes)

        model.animations = []
        model.animations.push(animation)
        scene.beginAnimation(model, 0, 30, true)
    }

    //COMMENT
    createParticles(scene: babylonjs.Scene)
    {
        const particleSystem = new babylonjs.ParticleSystem("particleSystem", 5000, scene)
        particleSystem.particleTexture = new babylonjs.Texture("assets/textures/flare.png")

        /*particleSystem.emitter = new babylonjs.Vector3(0, 0, 0)
        particleSystem.minEmitBox = new babylonjs.Vector3(0, 0, 0)
        particleSystem.maxEmitBox = new babylonjs.Vector3(0, 0, 0)

        //Colour range
        particleSystem.color1 = new babylonjs.Color4(1.0, 1.0, 1.0, 1.0)
        particleSystem.color2 = new babylonjs.Color4(0.0, 0.0, 0.0, 0.0)
        particleSystem.blendMode = babylonjs.ParticleSystem.BLENDMODE_ONEONE

        //Size range
        particleSystem.minSize = 0.01
        particleSystem.maxSize = 0.05

        //Lifetime range
        particleSystem.minLifeTime = 0.5
        particleSystem.maxLifeTime = 0.5

        particleSystem.emitRate = 50

        particleSystem.direction1 = new babylonjs.Vector3(-1, 0, 1)
        particleSystem.direction2 = new babylonjs.Vector3(1, 0, -1)

        particleSystem.minEmitPower = 0.2
        particleSystem.maxEmitPower = 0.3
        particleSystem.updateSpeed = 0.01

        particleSystem.gravity = new babylonjs.Vector3(0, -9.81, 0)*/

        particleSystem.start()
    }

    addSounds(scene: babylonjs.Scene)
    {
        const music = new babylonjs.Sound("music", "assets/sounds/test.mp3", scene, null, {loop: true, autoplay: true})
        //const sound = new babylonjs.Sound("sound", "assets/sounds/button.mp3", scene, null)
        //sound.play()
    }

    createText(scene: babylonjs.Scene)
    {
        //Width and height of the plane itself
        const helloPlane = babylonjs.MeshBuilder.CreatePlane('hello plane', {width: 4, height: 3})
        helloPlane.position.y = 0
        helloPlane.position.z = 5
        //Width and height of the texture, default to 1024 x 1024
        const helloTexture = babylonjsgui.AdvancedDynamicTexture.CreateForMesh(helloPlane, 1024, 1024)
        helloTexture.background = "white"

        const helloText = new babylonjsgui.TextBlock("hello")
        helloText.text = "GOOD DAY"
        helloText.color = "purple"
        helloText.fontSize = 500
        helloTexture.addControl(helloText) //Pass the helloText into the texture, what the texture will show

        helloText.onPointerUpObservable.add(eventData => {
            alert("Hello Text up at:\nx: " + eventData.x + "\ny: " + eventData.y)
        })
        helloText.onPointerDownObservable.add(eventData => {
            alert("Hello Text down")
        })
    }
}