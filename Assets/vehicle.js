#pragma strict

var engineFront : float;
var engineBack : float;
var steerAngle : float;

var backLeft : WheelCollider;
var backRight : WheelCollider;
var frontLeft : WheelCollider;
var frontRight : WheelCollider;

var isOccupied : boolean = false;

var player : Transform;
var view : Transform;

function Start() {
}

function Update() {
	if (isOccupied) {
		backLeft.motorTorque = engineBack * Input.GetAxis("Vertical");
		backRight.motorTorque = frontLeft.motorTorque;
		frontLeft.motorTorque = engineFront * Input.GetAxis("Vertical");
		frontRight.motorTorque = frontLeft.motorTorque;
		Debug.Log(Input.GetAxis("Vertical"));
		frontLeft.steerAngle = steerAngle * Input.GetAxis("Horizontal");
		frontRight.steerAngle = frontLeft.steerAngle;
		GameObject.Find("Player(Clone)").transform.position = transform.position;
		if (Input.GetButtonDown("Enter"))
			exit();
	}
	else if (Input.GetButtonDown("Enter"))
		enter();
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
	Debug.Log("toggling");
	GameObject.Find("Player(Clone)").transform.Find("Controller").GetComponent(manageWeaponFiring).setVehicleStatus(flag);
}