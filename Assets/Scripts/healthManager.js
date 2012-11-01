#pragma strict

var maxHealth : int;

var health : int;
private var lastSource : Transform;

var wasAlive : boolean;

function Start() {
	health = maxHealth;
	wasAlive = true;
}

function dealDamage(amount : int, source : Transform) {
	health -= amount;
	lastSource = source;
	AudioHandler.playHurtNoise();
}

function getHealthRatio() {
	return health > 0 ? (health * 1f) / maxHealth : 0;
}

function heal(amount : int) {
	health = (health + amount > 100) ? 100 : amount + health;
}

function isAlive() {
	if (Global.godMode && transform.gameObject.name.Substring(0,6) == "Player") return true;
	return health > 0;
}

function isAliveUpdate() {
	if (Global.godMode && transform.gameObject.name.Substring(0,6) == "Player") { wasAlive = true; return true; }
	wasAlive = health > 0;
	return health > 0;
}