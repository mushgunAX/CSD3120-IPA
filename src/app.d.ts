import * as babylonjs from "babylonjs";
import 'babylonjs-loaders';
export declare class App {
    private engine;
    private canvas;
    constructor(engine: babylonjs.Engine, canvas: HTMLCanvasElement);
    createXRScene(canvasID: string, authoringData?: {
        [dataType: string]: {
            [key: string]: any;
        };
    }): Promise<babylonjs.Scene>;
    createCamera(scene: babylonjs.Scene): void;
    createLights(scene: babylonjs.Scene): void;
    createSkybox(scene: babylonjs.Scene): void;
    addInspectorKeyboardShortcut(scene: babylonjs.Scene): void;
    loadModel(scene: babylonjs.Scene): void;
    createAnimation(scene: babylonjs.Scene, model: babylonjs.AbstractMesh): void;
    createParticles(scene: babylonjs.Scene): void;
    addSounds(scene: babylonjs.Scene): void;
    createText(scene: babylonjs.Scene): void;
}
