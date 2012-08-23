#pragma strict

static class GUIHandler {

	private var skin : GUISkin;

	var GUIColor : Color;
	var healthColor : Color;
	var fadedBarColor : Color;
	var deadScreenOverlay : Color;
	var textColor : Color;
	var backgroundColor : Color;
	
	var logo : Texture;
	var monotone : Texture;
	var background : Texture;
	var backhandReticle : Texture;
	var forehandReticle : Texture;
		
	function loadColors(colors : Color[]) {
		GUIColor = colors[0];
		healthColor = colors[1];
		fadedBarColor = colors[2];
		deadScreenOverlay = colors[3];
		backgroundColor = colors[4];
	}
	
	function loadImages(images : Texture[]) {
		logo = images[0];
		monotone = images[1];
		background = images[2];
		backhandReticle = images[3];
		forehandReticle = images[4];
	}
	
	function setSkin(skin : GUISkin) {
		this.skin = skin;
	}
	
	function msg(pos : Rect,s : String)  {
		GUI.skin = skin;
		GUI.Label(pos,s);
	}
	
	function box(pos : Rect,s : String) {
		GUI.skin = skin;
		GUI.Box(pos,s);
	}
	
	function button(x : int,y : int,width : int,height : int,text : String) {
		GUI.skin = skin;
		return GUI.Button(Rect(x,y,width,height),text);
	}

}