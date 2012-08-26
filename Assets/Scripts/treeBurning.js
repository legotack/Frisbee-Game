#pragma strict

function Start () {
}

function Update () {

}

function OnCollisionEnter(collision : Collision) {
	if (collision.collider.tag == "fire") {
		burnTree();
	}
}

function burnTree() {
	Debug.Log("burning");
}