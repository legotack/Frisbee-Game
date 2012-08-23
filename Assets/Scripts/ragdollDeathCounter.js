#pragma strict

private var time : float;

var limit : float;

function Start() {
	time = 0;
}

function Update() {
	time += Time.deltaTime;
	if (time > limit)
		Destroy(gameObject);
}