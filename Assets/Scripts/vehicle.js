#pragma strict
	
class vehicle extends playerInteractor {
	
	var engineFront : float;
	var engineBack : float;
	var steerAngle : float;
	
	var backLeft : WheelCollider;
	var backRight : WheelCollider;
	var frontLeft : WheelCollider;
	var frontRight : WheelCollider;
	
	var player : Transform;
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

}