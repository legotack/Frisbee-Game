#pragma strict

var view : Transform;

var isOccupied : boolean = false;
var enterDistance : float;

function OnGUI() {
	if (canBeEntered() && ! isOccupied)
		GUIHandler.box(Rect(transform.Find("View").camera.WorldToScreenPoint(transform.position).x,transform.Find("View").camera.WorldToScreenPoint(transform.position).y,30,30),"Z");
		
}

function canBeEntered() {
	return Vector3.Distance(GameObject.Find("Player(Clone)").transform.position,transform.position) < enterDistance;
}

function enter() {
	toggle(true);
	isOccupied = true;
}

function exit() {
	GameObject.Find("Player(Clone)").transform.position.y += enterDistance;
	toggle(false);
	isOccupied = false;
}

function toggle(flag : boolean) {
	Debug.Log(camera);
	view.GetComponent(Camera).enabled = flag;
	view.GetComponent(AudioListener).enabled = flag;
	GameObject.Find("Player(Clone)").transform.Find("Controller").GetComponent(manageWeaponFiring).setVehicleStatus(flag,transform);
}

function OnCollisionEnter(collision : Collision) {
	Debug.Log("collision");
	if (collision.collider.name != "Player(Clone)" && collision.collider.tag == "Player")
		collision.collider.GetComponent(damageListener).getShot(100,gameObject.Find("Player(Clone)").transform);
}