#pragma strict

var game : gameHandler;

private var weapon : InventoryWeapon;
private var health : healthManager;
private var respawnTimer : RespawnTimer;

function Start () {
	weapon = getInventoryWeapon(0);
	health = GetComponent(healthManager);
	respawnTimer = new RespawnTimer(4);
	game = GameObject.Find("Map").GetComponent(gameHandler);
	toggleControl(true);
}

function Update () {
	var w : boolean = health.wasAlive;
	if (health.isAliveUpdate()) {
		if (Input.GetButtonDown("Fire1") && weapon.reloadTimer.canShoot()) {
			shoot(weapon.weapon);
			weapon.reloadTimer.takeShot();
		}
		if (Input.GetButtonDown("Fire2") && weapon.reloadTimer.canShoot())
			weapon.powerupTimer.setOn(true);
		if (Input.GetButton("Fire2") && weapon.reloadTimer.canShoot() && weapon.powerupTimer.activated)
			weapon.powerupTimer.update();
		if (Input.GetButtonUp("Fire2") && weapon.reloadTimer.canShoot() && weapon.powerupTimer.activated) {
			shoot(weapon.weapon).GetComponent(frisbeeMotion).setForehand(weapon.powerupTimer.getValue());
			weapon.reloadTimer.takeShot();
			weapon.powerupTimer.reset();
		}
		checkForWeaponSwitches();
		weapon.reloadTimer.update();
	}
	else {
		if (game.gamemode.shouldRespawn(transform))
			respawnTimer.update();
		else if (w)
			game.endGame(false);
	}
	toggleControl(health.isAlive() && ! game.gamemode.isDone);
}

function shoot(frisbee : Transform) {
	var f : Transform = Instantiate(frisbee,transform.position + transform.forward * 1.1,transform.rotation);
	frisbee.rigidbody.velocity = transform.parent.GetComponent(CharacterController).velocity;
	frisbee.GetComponent(frisbeeMotion).shooter = transform;
	return f;
}

function toggleControl(flag : boolean) {
	transform.parent.GetComponent(CharacterMotor).canControl = flag;
	transform.parent.GetComponent(MouseLook).enabled = flag;
	GetComponent(MouseLook).enabled = flag;
}

function respawn() {
	game.gamemode.spawnPlayer();
	Destroy(gameObject);
}

function checkForWeaponSwitches() {
	for (var i : int = 0; i < 9; i++) {
		if (Input.GetKeyDown((i + 1).ToString()) && transform.GetComponent(loadout).hasWeaponIndex(i)) {
			weapon.reloadTimer.takeShot();
			weapon = getInventoryWeapon(i);
		}
	}
	//TODO add scrollwheel
}

function getInventoryWeapon(i : int) {
	return transform.GetComponent(loadout).weapons[i];
}

function OnGUI() {
	if (health && health.isAlive())
		drawHUD();
	else if (game.gamemode.shouldRespawn(transform))
		drawDeathScreen();
}

function drawDeathScreen() { //trigger end game if death ends game?
	var timeBeforeRespawn : float = respawnTimer.getValue();
	renderBar(timeBeforeRespawn,GUIHandler.GUIColor,true);
	if (timeBeforeRespawn >= 1 && GUI.Button(Rect(Screen.width - 15 - GUIHandler.monotone.width,Screen.height - 60 - GUIHandler.monotone.height, GUIHandler.monotone.width, 30),"Respawn"))
		respawn();
}

function drawHUD() {
	if (weapon.powerupTimer.activated)
		renderBar(weapon.powerupTimer.getValue(),GUIHandler.GUIColor,true);
	renderBar(health.getHealthRatio(),GUIHandler.healthColor,false);
	renderReticle(weapon.powerupTimer.activated ? 64 : 128 * weapon.reloadTimer.getValue(),GUIHandler.GUIColor);
}

function renderReticle(width : int, color : Color) {
	var x : int = Screen.width / 2 - width / 2;
	var y : int = Screen.height / 2 - width / 2;
	GUI.color = color;
	if (weapon.powerupTimer.activated) GUI.color.a = 255;
	GUI.DrawTexture(Rect(x,y,width,width),weapon.powerupTimer.activated ? GUIHandler.forehandReticle : GUIHandler.backhandReticle,ScaleMode.StretchToFill);
}

function renderBar(coeff : float, color : Color,inverted : boolean) {
	GUI.color = GUIHandler.fadedBarColor;
	if (inverted) {
		GUI.DrawTexture(Rect(Screen.width - 15 - GUIHandler.monotone.width,Screen.height - 15 - GUIHandler.monotone.height,GUIHandler.monotone.width,GUIHandler.monotone.height),GUIHandler.monotone,ScaleMode.StretchToFill);
		GUI.color = color;
		GUI.DrawTexture(Rect(Screen.width - 15 - GUIHandler.monotone.width * coeff,Screen.height - 15 - GUIHandler.monotone.height,GUIHandler.monotone.width * coeff,GUIHandler.monotone.height),GUIHandler.monotone,ScaleMode.StretchToFill);
	}
	else {
		GUI.DrawTexture(Rect(15,Screen.height - 15 - GUIHandler.monotone.height,GUIHandler.monotone.width,GUIHandler.monotone.height),GUIHandler.monotone,ScaleMode.StretchToFill);
		GUI.color = color;
		GUI.DrawTexture(Rect(15,Screen.height - 15 - GUIHandler.monotone.height,GUIHandler.monotone.width * coeff,GUIHandler.monotone.height),GUIHandler.monotone,ScaleMode.StretchToFill);
	}
	GUI.color = Color.white;
}