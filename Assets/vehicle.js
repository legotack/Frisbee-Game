#pragma strict

var backLeft : WheelCollider;
var backRight : WheelCollider;

function Start() {
	backLeft = transform.Find("BackLeft").GetComponent(WheelCollider);
	backRight = transform.Find("BackRight").GetComponent(WheelCollider);
}

function Update() {
	backLeft.motorTorque = 4;
	backRight.motorTorque = 4;
}