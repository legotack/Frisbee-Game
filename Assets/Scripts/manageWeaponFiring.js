#pragma strict

var game : gameHandler;

private var weapon : InventoryWeapon;
private var health : healthManager;
private var inventory : loadout;
private var respawnTimer : RespawnTimer;

var isInVehicle : boolean = false;

function Start () {
	inventory = GetComponent(loadout);
	weapon = getInventoryWeapon(0);
	health = transform.parent.GetComponent(healthManager);
	respawnTimer = new RespawnTimer(4);
	game = GameObject.Find("Map").GetComponent(gameHandler);
	toggleControl(true);
}

function Update () {
	var w : boolean = health.wasAlive;
	if (health.isAliveUpdate()) {
		if (! isInVehicle) {
			if (Input.GetButtonDown("Fire1") && weapon.reloadTimer.canShoot() && weapon.ammoCounter.hasEnoughAmmo())
				shoot(weapon.weapon);
			if (Input.GetButtonDown("Fire2") && weapon.reloadTimer.canShoot() && weapon.ammoCounter.hasEnoughAmmo())
				weapon.powerupTimer.setOn(true);
			if (Input.GetButton("Fire2") && weapon.reloadTimer.canShoot() && weapon.powerupTimer.activated)
				weapon.powerupTimer.update();
			if (Input.GetButtonUp("Fire2") && weapon.reloadTimer.canShoot() && weapon.powerupTimer.activated && weapon.ammoCounter.hasEnoughAmmo()) {
				shoot(weapon.weapon).GetComponent(frisbeeMotion).setForehand(weapon.powerupTimer.getValue());
				weapon.powerupTimer.reset();
			}
			checkForWeaponSwitches();
			weapon.reloadTimer.update();
		}
	}
	else {
		if (game.gamemode.shouldRespawn(transform))
			respawnTimer.update();
		else if (w)
			game.endGame(false);
	}
	toggleControl(health.isAlive() && ! game.gamemode.isDone && ! isInVehicle);
}

function shoot(frisbee : Transform) {
	weapon.reloadTimer.takeShot();
	weapon.ammoCounter.takeShot();
	var f : Transform = Instantiate(frisbee,transform.position + transform.forward * frisbee.GetComponent(frisbeeMotion).getRadius(),transform.rotation);
	frisbee.rigidbody.velocity = transform.parent.GetComponent(CharacterController).velocity;
	frisbee.GetComponent(frisbeeMotion).shooter = transform;
	return f;
}

function toggleControl(flag : boolean) {
	transform.parent.GetComponent(CharacterMotor).canControl = flag;
	transform.parent.GetComponent(MouseLook).enabled = flag;
	GetComponent(MouseLook).enabled = flag;
}

function setVehicleStatus(flag : boolean) {
	GetComponent(Camera).enabled = ! flag;
	GetComponent(AudioListener).enabled = ! flag;
	transform.parent.Find("Graphics").GetComponent(MeshRenderer).enabled = ! flag;
	transform.parent.GetComponent(CharacterController).enabled = ! flag;
	isInVehicle = flag;
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
	return inventory.weapons[i];
}

function OnGUI() {
	if (health && health.isAlive())
		drawHUD();
	else if (game.gamemode.shouldRespawn(transform))
		drawDeathScreen();
}

function drawDeathScreen() { //trigger end game if death ends game?
	var timeBeforeRespawn : float = respawnTimer.getValue();
	GUIHandler.progressBar(timeBeforeRespawn,GUIHandler.GUIColor,true);
	if (timeBeforeRespawn >= 1 && GUI.Button(Rect(Screen.width - 15 - GUIHandler.monotone.width,Screen.height - 60 - GUIHandler.monotone.height, GUIHandler.monotone.width, 30),"Respawn"))
		respawn();
}

function drawHUD() {
	if (weapon.powerupTimer.activated)
		GUIHandler.progressBar(weapon.powerupTimer.getValue(),GUIHandler.GUIColor,true);
	GUIHandler.progressBar(health.getHealthRatio(),GUIHandler.healthColor,false);
	if (! isInVehicle)
		renderReticle(weapon.powerupTimer.activated ? 64 : 128 * weapon.reloadTimer.getValue(),GUIHandler.GUIColor);
	renderAmmo();
}

function renderReticle(width : int, color : Color) {
	var x : int = Screen.width / 2 - width / 2;
	var y : int = Screen.height / 2 - width / 2;
	GUI.color = color;
	if (weapon.powerupTimer.activated) GUI.color.a = 255;
	GUI.DrawTexture(Rect(x,y,width,width),weapon.powerupTimer.activated ? GUIHandler.forehandReticle : GUIHandler.backhandReticle,ScaleMode.StretchToFill);
}

function renderAmmo() {
	if (weapon.ammoCounter.hasEnoughAmmo()) {
		GUI.color = Color.green;
		var numFrisbees : int = (weapon.ammoCounter.ammo > 16) ? 16 : weapon.ammoCounter.ammo;
		for (var i : int = 0; i < numFrisbees; i++)
			GUI.DrawTexture(Rect(15 + 16 * i,Screen.height - 51,16,16),GUIHandler.frisbeeIcon);
	}
	else {
		GUI.color = Color.red;
		GUI.DrawTexture(Rect(15,Screen.height - 51,16,16),GUIHandler.frisbeeIcon);
	}
}