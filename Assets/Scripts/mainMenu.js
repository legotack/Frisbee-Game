#pragma strict

var colors : Color[];
var images : Texture[];
var skin : GUISkin;

function Start() {
	GUIHandler.loadColors(colors);
	GUIHandler.loadImages(images);
	GUIHandler.setSkin(skin);
}

function OnGUI() {
	GUI.color = GUIHandler.GUIColor;
	GUI.DrawTexture(Rect(0,0,GUIHandler.logo.width,Screen.height),GUIHandler.monotone);
	GUI.color = GUIHandler.backgroundColor;
	GUI.DrawTexture(Rect(GUIHandler.logo.width,0,Screen.width - GUIHandler.logo.width,Screen.height),GUIHandler.background);
	GUI.color = Color.white;
	GUIHandler.msg(Rect(15,15 + GUIHandler.logo.height,GUIHandler.logo.width - 30,Screen.height - 15 - GUIHandler.logo.height),"Welcome to fShargle Warfare BETA!\nMade by the SnorriDev Team.");
	GUI.DrawTexture(Rect(0, 0,GUIHandler.logo.width,GUIHandler.logo.height),GUIHandler.logo);
	if (drawMenuOption("Survival Beta on Dam",0)) {
		Global.selectedGamemode = new SurvivalMode();
		Application.LoadLevel("Dam");
	}
	if (drawMenuOption("Survival Beta on Bridge",1)) {
		Global.selectedGamemode = new SurvivalMode();
		Application.LoadLevel("Bridge");
	}
	if (drawMenuOption("Quit",2))
		Application.Quit();
}

function drawMenuOption(text : String, position : int) {
	return GUIHandler.button(Screen.width * 1/2 - 100,Screen.height * 1/3 + 65 * position,200,50,text);
}

//TODO: GUI window class with holder, etc.
//this whole thing is just a placeholder