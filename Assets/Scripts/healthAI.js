#pragma strict

var ragdoll : Transform;
var minViewDistance : float;

private var health : healthManager;
private var model : Transform;
private var audioStuff : AudioHandler;

function Start() {
	health = GetComponent(healthManager);
	model = transform.Find("roothandle");
	audioStuff = GetComponent(AudioHandler);
}

function Update() {
	if (! GetComponent(healthManager).isAlive()) {
		GameObject.Find("Map").GetComponent(gameHandler).gamemode.stats.kill();
		Destroy(gameObject);
		Instantiate(ragdoll,transform.position,transform.rotation);
		audioStuff.playDeathNoise();
		Global.balance += 15;
	}
}

function OnGUI() {
	if (Camera.main != null && model.renderer.isVisible && Vector3.Distance(Camera.main.transform.position,transform.position) < minViewDistance)
		GUIHandler.healthBar(health.getHealthRatio(), transform.position + Vector3(0,1.2,0),false);
}