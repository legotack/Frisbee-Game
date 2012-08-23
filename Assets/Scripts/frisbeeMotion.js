#pragma strict

var lift : float;
var initialForce : float;
var damage: float;

var reloadTime : float;
var timeBeforeDespawn : float;
var forehandSpeedCoefficient : float;
var frisbeePowerupTime : float;

var shooter : Transform;

function Start () {
	timeBeforeDespawn = 3;
	transform.rigidbody.AddForce(transform.forward * initialForce);
}

function setForehand(magnitude : float) {
	transform.rigidbody.AddForce(transform.forward * initialForce * forehandSpeedCoefficient * (magnitude - 0.5) * 2);
	if (magnitude < 0.5)
		lift *= 2 * magnitude;
}

function FixedUpdate () {
	transform.rigidbody.AddForce(Vector3(0,transform.up.y,0) * lift);
	transform.Rotate(Vector3(0,lift * 3000 * Time.deltaTime,0));
	if (lift == 0)
		timeBeforeDespawn -= Time.deltaTime;
	if (timeBeforeDespawn < 0)
		Destroy(gameObject);
}

function OnCollisionEnter(collision : Collision) {
	lift = 0;
	if (collision.collider.tag == "Player")
		collision.collider.GetComponent(damageListener).getShot(damage,shooter);
}