#pragma strict

var fallDamageAddend : int;


private var health : healthManager;

function Start() {
	health = GetComponent(healthManager);
}

function OnControllerColliderHit(hit : ControllerColliderHit) {
	var v : Vector3 = GetComponent(CharacterController).velocity;
	//if (hit.collider.attachedRigidbody)
	//	v -= hit.collider.attachedRigidbody.velocity;
	if (Mathf.Abs(v.y) > fallDamageAddend && health) health.dealDamage(Mathf.Abs(v.y) - fallDamageAddend,transform);
}

function getShot(amount : int, t : Transform) {
	health.dealDamage(amount,t);
}

function OnParticleCollision(other : GameObject) {
	Debug.Log("yo u burnin");
}