#pragma strict

var backLeft : WheelCollider;
var backRight : WheelCollider;
var frontLeft : WheelCollider;
var frontRight : WheelCollider;

function Update() {
	frontLeft.motorTorque = 600;
	frontRight.motorTorque = 600;
}