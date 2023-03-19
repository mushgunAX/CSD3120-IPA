using Zinnia.Action;
using WebXR;

public class WebXRGrip : BooleanAction
{
  public WebXRController controller;
  private void Update()
  {
    Receive(controller.GetButton(WebXRController.ButtonTypes.Grip));
  }
}
