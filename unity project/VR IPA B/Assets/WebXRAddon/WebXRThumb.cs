using Zinnia.Action;
using WebXR;
using UnityEngine;

public class WebXRThumb : BooleanAction
{
  public WebXRController controller;

  void Update()
  {
    Receive(controller.GetButton(WebXRController.ButtonTypes.Thumbstick));
  }
}
