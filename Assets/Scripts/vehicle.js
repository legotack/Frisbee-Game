#pragma strict

var engineFront : float;
var engineBack : float;
var steerAngle : float;

var backLeft : WheelCollider;
var backRight : WheelCollider;
var frontLeft : WheelCollider;
var frontRight : WheelCollider;

var isOccupied : boolean = false;
var enterDistance : float;

var player : Transform;
var view : Transform;
var health : healthManager;

//merge everything related to entering/exiting into a PlayerInteractor class or something

function Start() {
	health = GetComponent(healthManager);
}

function Update() {
	if (health.isAlive()) {
		if (isOccupied) {
			backLeft.motorTorque = engineBack * Input.GetAxis("Vertical");
			backRight.motorTorque = frontLeft.motorTorque;
			frontLeft.motorTorque = engineFront * Input.GetAxis("Vertical");
			frontRight.motorTorque = frontLeft.motorTorque;
			frontLeft.steerAngle = steerAngle * Input.GetAxis("Horizontal");
			frontRight.steerAngle = frontLeft.steerAngle;
			GameObject.Find("Player(Clone)").transform.position = transform.position;
			if (Input.GetButtonDown("Enter"))
				exit();
		}
		else if (Input.GetButtonDown("Enter") && canBeEntered())
			enter();
	}
	else {
		if (isOccupied)
			player.GetComponent(damageListener).getShot(100,transform);
		Destroy(gameObject);
	}
}

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
	GameObject.Find("Player(Clone)").transform.position.y += 2;
	toggle(false);
	isOccupied = false;
}

function toggle(flag : boolean) {
	Debug.Log(camera);
	view.GetComponent(Camera).enabled = flag;
	view.GetComponent(AudioListener).enabled = flag;
	GameObject.Find("Player(Clone)").transform.Find("Controller").GetComponent(manageWeaponFiring).setVehicleStatus(flag,transform);
}

function OnControllerColliderHit(collision : ControllerColliderHit) {
	Debug.Log("collision");
	if (collision.transform.name != "Player(Clone)" && collision.transform.tag == "Player")
		collision.collider.GetComponent(damageListener).getShot(100,gameObject.Find("Player(Clone)").transform);
}