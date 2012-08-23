#pragma strict

var creator : Transform;

function OnControllerColliderHit(collision : ControllerColliderHit) {
	Debug.Log(collision.collider);
	if (collision.collider.tag == "player") 
		collision.collider.GetComponent(damageListener).getShot(5,creator);
}