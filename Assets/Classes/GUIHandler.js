#pragma strict

static class GUIHandler {

	private var skin : GUISkin;

	var GUIColor : Color;
	var healthColor : Color;
	var fadedBarColor : Color;
	var deadScreenOverlay : Color;
	var textColor : Color;
	var backgroundColor : Color;
	
	var menu : Texture;
	var monotone : Texture;
	var background : Texture;
	var backhandReticle : Texture;
	var forehandReticle : Texture;
	var frisbeeIcon : Texture;
		
	function loadColors(colors : Color[]) {
		GUIColor = colors[0];
		healthColor = colors[1];
		fadedBarColor = colors[2];
		deadScreenOverlay = colors[3];
		backgroundColor = colors[4];
	}
	
	function loadImages(images : Texture[]) {
		menu = images[0];
		monotone = images[1];
		background = images[2];
		backhandReticle = images[3];
		forehandReticle = images[4];
		frisbeeIcon = images[5];
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
	
	function button(x : int, y : int, width : int, height : int, text : String) {
		GUI.skin = skin;
		return GUI.Button(Rect(x,y,width,height),text);
	}
	
	function customButton(x : int,y : int,style : String) {
		GUI.skin = skin;
		return GUI.Button(Rect(x,y,250,75),"",style);
	}
	
	function progressBar(coeff : float, color : Color,inverted : boolean) {
		GUI.color = Color.white;
		if (inverted) {
			GUI.DrawTexture(Rect(Screen.width - 25 - monotone.width,Screen.height - 25 - monotone.height,monotone.width + 10,monotone.height + 10),background,ScaleMode.StretchToFill);
			GUI.color = fadedBarColor;
			GUI.DrawTexture(Rect(Screen.width - 20 - monotone.width,Screen.height - 20 - monotone.height,monotone.width,monotone.height),monotone,ScaleMode.StretchToFill);
			GUI.color = color;
			GUI.DrawTexture(Rect(Screen.width - 20 - monotone.width * coeff,Screen.height - 20 - monotone.height,monotone.width * coeff,monotone.height),monotone,ScaleMode.StretchToFill);
		}
		else {
			GUI.DrawTexture(Rect(15,Screen.height - 25 - monotone.height,monotone.width + 10,monotone.height + 10),background,ScaleMode.StretchToFill);
			GUI.color = fadedBarColor;
			GUI.DrawTexture(Rect(20,Screen.height - 20 - monotone.height,monotone.width,monotone.height),monotone,ScaleMode.StretchToFill);
			GUI.color = color;
			GUI.DrawTexture(Rect(20,Screen.height - 20 - monotone.height,monotone.width * coeff,monotone.height),monotone,ScaleMode.StretchToFill);
		}
	}
	
	function healthBar(coeff : float, position : Vector3, friendly : boolean) {
		if (Camera.main != null) {
			var healthBarCoords : Vector2 = Camera.main.WorldToScreenPoint(position);
			if (Mathf.Abs(healthBarCoords.x - Screen.width / 2) > 128 || Mathf.Abs(healthBarCoords.y - Screen.height / 2) > 128)
				return;
			var distanceModifier : float = 2 / Vector3.Distance(Camera.main.transform.position,position);
			GUI.color = fadedBarColor;
			GUI.DrawTexture(Rect(healthBarCoords.x - monotone.width * distanceModifier / 2,Screen.height - healthBarCoords.y,monotone.width * distanceModifier,monotone.height * distanceModifier),monotone,ScaleMode.StretchToFill);
			GUI.color = friendly ? GUIColor : healthColor;
			GUI.DrawTexture(Rect(healthBarCoords.x - monotone.width * distanceModifier / 2,Screen.height - healthBarCoords.y,monotone.width * coeff * distanceModifier,monotone.height * distanceModifier),monotone,ScaleMode.StretchToFill);
		}
	}
	
}