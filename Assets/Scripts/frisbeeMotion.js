#pragma strict

var lift : float;
var initialForce : float;
var damage: float;

var reloadTime : float;
var timeBeforeDespawn : float;
var forehandSpeedCoefficient : float;
var frisbeePowerupTime : float;
var startingAmmo : float;
var vehicleMultiplier : float;
var price : int;

var combustTo : Transform;

var shooter : Transform;

function Start () {
	transform.rigidbody.AddForce(transform.forward * initialForce);
}

function setForehand(magnitude : float) {
	transform.rigidbody.AddForce(transform.forward * initialForce * forehandSpeedCoefficient * (magnitude - 0.5) * 2);
	if (magnitude < 0.5)
		lift *= 2 * magnitude;
}

function getRadius() {
	return transform.localScale.x / 2.0 + 0.41; //player width
}

function FixedUpdate () {
	transform.rigidbody.AddForce(Vector3(0,transform.up.y,0) * lift);
	transform.Rotate(Vector3(0,lift * 3000 * Time.deltaTime,0));
	if (lift == 0)
		timeBeforeDespawn -= Time.deltaTime;
	if (timeBeforeDespawn < 0)
		kill();
}

function OnCollisionEnter(collision : Collision) {
	lift = 0;
	if (collision.collider.tag == "Player")
		collision.collider.GetComponent(damageListener).getShot(damage,shooter);
	if (collision.collider.tag == "Vehicle")
		collision.collider.transform.parent.parent.GetComponent(damageListener).getShot(damage * vehicleMultiplier,shooter);
	if (combustTo) {
		var c : Transform = Instantiate(combustTo,transform.position,transform.rotation);
		c.GetComponentInChildren(fireDamageDealer).creator = transform;
		c.rigidbody.velocity = rigidbody.velocity / 2;
		kill();
	}
}

function kill() {
	//Instantiate(particleEffect,transform.position,transform.rotation);
	Destroy(gameObject);
}