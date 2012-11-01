#pragma strict
	
class vehicle extends playerInteractor {
	
	var engineFront : float;
	var engineBack : float;
	var steerAngle : float;
	
	var backLeft : WheelCollider;
	var backRight : WheelCollider;
	var frontLeft : WheelCollider;
	var frontRight : WheelCollider;
	
	
	protected function playerInsideEvent() {
		backLeft.motorTorque = engineBack * Input.GetAxis("Vertical");
		backRight.motorTorque = frontLeft.motorTorque;
		frontLeft.motorTorque = engineFront * Input.GetAxis("Vertical");
		frontRight.motorTorque = frontLeft.motorTorque;
		frontLeft.steerAngle = steerAngle * Input.GetAxis("Horizontal");
		frontRight.steerAngle = frontLeft.steerAngle;
		GameObject.Find("Player(Clone)").transform.position = transform.position;
	}

}