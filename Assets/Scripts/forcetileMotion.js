#pragma strict

class forcetileMotion extends frisbeeMotion {
	var force : float;
	var decelerationCoefficient : float;

	private var impactForce : Vector3;
	private var enemyPushing : boolean = false;
	
	private var enemyController : CharacterController;
	private var enemyFrisbee : Rigidbody;
	
	function OnCollisionEnter(collision : Collision) {
		var dir : Vector3;
		enemyController = collision.transform.GetComponent(CharacterController);
		if (enemyController != null) {
			dir = transform.rigidbody.velocity;
			dir.Normalize();
			dir.y = 0;
			impactForce += dir.normalized * force / Constants.ENEMY_MASS;
			enemyPushing = true;
		}
		else {
			enemyFrisbee = collision.rigidbody;
			if (enemyFrisbee != null) {
				dir = transform.rigidbody.velocity;
				dir.y = 0;
				enemyFrisbee.AddForce(dir.normalized * force / enemyFrisbee.mass);
			}
		}
	}
	
	function FixedUpdate() {
		super.FixedUpdate();
		if (enemyPushing && enemyController != null) {
			if (impactForce.magnitude > 0.2) enemyController.Move(impactForce * Time.deltaTime);
			impactForce = Vector3.Lerp(impactForce, Vector3.zero, 0.1*Time.deltaTime);
			
			transform.rigidbody.velocity *= decelerationCoefficient;
			if (transform.rigidbody.velocity.magnitude < 0.5) Destroy(gameObject);
		}
	}
}