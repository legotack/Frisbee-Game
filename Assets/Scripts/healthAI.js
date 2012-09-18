#pragma strict

var ragdoll : Transform;
var barTexture : Texture;
var minViewDistance : float;

private var healthBarCoords : Vector2;
private var health : healthManager;
private var model : Transform;
private var distanceModifier : float;

function Start() {
	health = GetComponent(healthManager);
	model = transform.Find("roothandle");
}

function Update() {
	if (! GetComponent(healthManager).isAlive()) {	
		Destroy(gameObject);
		Instantiate(ragdoll,transform.position,transform.rotation);
		Global.balance += 15;
	}
}

function OnGUI() {
	if (model.renderer.isVisible && Vector3.Distance(Camera.main.transform.position,transform.position) < minViewDistance) {
		healthBarCoords = Camera.main.WorldToScreenPoint(transform.position + Vector3(0,1.2,0));
		distanceModifier = 2 / Vector3.Distance(Camera.main.transform.position,transform.position);
		GUI.color = GUIHandler.fadedBarColor;
		GUI.DrawTexture(Rect(healthBarCoords.x - barTexture.width * distanceModifier / 2,Screen.height - healthBarCoords.y,barTexture.width * distanceModifier,barTexture.height * distanceModifier),barTexture,ScaleMode.StretchToFill);
		GUI.color = GUIHandler.healthColor;
		GUI.DrawTexture(Rect(healthBarCoords.x - barTexture.width * distanceModifier / 2,Screen.height - healthBarCoords.y,barTexture.width * health.getHealthRatio() * distanceModifier,barTexture.height * distanceModifier),barTexture,ScaleMode.StretchToFill);
	}
}