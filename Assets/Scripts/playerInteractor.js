#pragma strict

var view : Transform;
var visibilityTest : Transform;

var enterDistance : float;
var healthBarTranslation : float;

var isOccupied : boolean = false;

private var player : Transform;
var health : healthManager;

function Start() {
	health = GetComponent(healthManager);
}

function Update() {
	if (health.isAlive()) {
		if (isOccupied) {
			playerInsideEvent();
			updateViewPosition();
			if (Input.GetButtonDown("Enter"))
				exit();
		}
		else if (Input.GetButtonDown("Enter") && canBeEntered())
			enter();
	}
	else {
		if (isOccupied)
			GameObject.Find("Player(Clone)").GetComponent(damageListener).getShot(100,transform);
		Destroy(gameObject);
	}
}

function updateViewPosition() {
	//view.RotateAround(transform.position, transform.right, Input.GetAxis("Mouse Y"));
	view.RotateAround(transform.position, transform.up, Input.GetAxis("Mouse X"));
}

function OnGUI() {
	if (canBeEntered() && ! isOccupied)
		GUIHandler.box(Rect(view.camera.WorldToScreenPoint(transform.position).x,view.camera.WorldToScreenPoint(transform.position).y,30,30),"Z");
	if (health && health.isAlive() && isOccupied)
		playerInsideGUIEvent();
	if (visibilityTest.renderer.isVisible)
		GUIHandler.healthBar(health.getHealthRatio(),transform.position + Vector3.up * healthBarTranslation,true);	
}

function OnCollisionEnter(collision : Collision) {
	if (collision.collider.name != "Player(Clone)" && collision.collider.tag == "Player")
		collision.collider.GetComponent(damageListener).getShot(100,gameObject.Find("Player(Clone)").transform);
}

function canBeEntered() {
	return Vector3.Distance(GameObject.Find("Player(Clone)").transform.position,transform.position) < enterDistance;
}

protected function playerInsideEvent() {
}

protected function playerInsideGUIEvent() {
}

private function enter() {
	toggle(true);
	isOccupied = true;
}

private function exit() {
	GameObject.Find("Player(Clone)").transform.position.y += enterDistance;
	toggle(false);
	isOccupied = false;
}

private function toggle(flag : boolean) {
	Debug.Log(camera);
	view.GetComponent(Camera).enabled = flag;
	view.GetComponent(AudioListener).enabled = flag;
	GameObject.Find("Player(Clone)").transform.Find("Controller").GetComponent(manageWeaponFiring).setVehicleStatus(flag,transform);
}