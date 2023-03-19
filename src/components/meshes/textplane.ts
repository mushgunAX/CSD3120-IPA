import * as babylonjs from 'babylonjs'
import * as babylonjsgui from 'babylonjs-gui'

export class TextPlane
{
    public text: babylonjsgui.TextBlock

    constructor(
        name: string,
        width: number,
        height: number,
        x: number, y: number, z: number,
        displayedText: string, backgroundColor: string, textColor: string, fontSize: number,
        scene: babylonjs.Scene)
    {
        //Width and height of the plane itself
        const textPlane = babylonjs.MeshBuilder.CreatePlane(name + " text plane", {width: width, height: height})
        textPlane.position.set(x, y, z)
        //Width and height of the texture, default to 1024 x 1024
        const texture = babylonjsgui.AdvancedDynamicTexture.CreateForMesh(textPlane)
        texture.background = backgroundColor

        const text = new babylonjsgui.TextBlock(name + " text")
        text.text = displayedText
        text.color = textColor
        text.fontSize = fontSize
        texture.addControl(text) //Pass the helloText into the texture, what the texture will show

        this.text = text
    }
}
