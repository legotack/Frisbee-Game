#pragma strict

var jumpInterval : float;

private var timeBeforeNextJump : float;
private var couldJump : boolean;

function Start() {
	timeBeforeNextJump = 0;
	couldJump = true;
}

function Update() {
	if (! canJump())
		timeBeforeNextJump -= Time.deltaTime;
	else if (Input.GetButtonDown("Jump"))
		timeBeforeNextJump = jumpInterval;
	GetComponent(CharacterMotor).jumping.enabled = couldJump;
	couldJump = canJump();
}

function canJump() : boolean {
	return timeBeforeNextJump <= 0;
}