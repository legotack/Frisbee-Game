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
}

function getHealthRatio() {
	return health > 0 ? (health * 1f) / maxHealth : 0;
}

function heal(amount : int) {
	health = (health + amount > 100) ? 100 : amount + health;
}

function isAlive() {
	return health > 0;
}

function isAliveUpdate() {
	wasAlive = health > 0;
	return health > 0;
}