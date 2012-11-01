#pragma strict

var colors : Color[];
var images : Texture[];
var skin : GUISkin;

static var selectedGamemode : GameMode;

function Start() {
	GUIHandler.loadColors(colors);
	GUIHandler.loadImages(images);
	GUIHandler.setSkin(skin);
}

/*
*
* TODO: make class Menu which is extended by MainMenu
*
*/

function OnGUI() {
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),GUIHandler.menu);
	if (drawMenuOption("Survival Beta on Dam","damButton",0)) {
		selectedGamemode = new SurvivalMode();
		Application.LoadLevel("Dam");
	}
	if (drawMenuOption("Survival Beta on Bridge","bridgeButton",1)) {
		selectedGamemode = new SurvivalMode();
		Application.LoadLevel("Bridge");
	}
	if (drawMenuOption("Survival Beta on Carlisle","carlisleButton",2)) {
		selectedGamemode = new SurvivalMode();
		Application.LoadLevel("Carlisle");
	}
	if (drawMenuOption("Quit","quitButton",3))
		Application.Quit();
}

function drawMenuOption(text : String, style : String, position : int) {
	if (style != null)
		return GUIHandler.customButton(Screen.width * 1/2 - 125,Screen.height * 1/4 + 100 * position,style);
	return GUIHandler.button(Screen.width * 1/2 - 125,Screen.height * 1/4 + 100 * position,250,75,text);
}

//TODO: GUI window class with holder, etc.
//this whole thing is just a placeholder