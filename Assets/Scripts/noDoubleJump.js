#pragma strict

var jumpInterval : float;

private var timeBeforeNextJump : float;
private var couldJump : boolean;

function Start() {
	if (Global.madHops) {
		GetComponent(CharacterMotor).jumping.baseHeight = 50;
	}
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