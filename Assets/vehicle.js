#pragma strict

var backLeft : WheelCollider;
var backRight : WheelCollider;
var frontLeft : WheelCollider;
var frontRight : WheelCollider;

function Update() {
	backLeft.motorTorque = 600;
	backRight.motorTorque = 600;
}