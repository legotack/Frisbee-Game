#pragma strict

var creator : Transform;
var damage : float;

function OnCollisionEnter(collision : Collision) {
	if (collision.collider.tag == "Player") {
		Debug.Log(collision.collider);
		collision.collider.GetComponent(damageListener).getShot(damage,creator);
	}
}