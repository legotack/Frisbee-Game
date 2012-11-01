#pragma strict

var maxHealth : int;

var health : int;
private var lastSource : Transform;
private var audioStuff : AudioHandler;
private var djAudioStuff : AudioSource;

var wasAlive : boolean;

function Start() {
	health = maxHealth;
	wasAlive = true;
	audioStuff = GetComponent(AudioHandler);
	djAudioStuff = GameObject.Find("Player(Clone)").Find("DJOfAudio").GetComponent(AudioSource);
}

function dealDamage(amount : int, source : Transform) {
	health -= amount;
	lastSource = source;
	audioStuff.playHurtNoise();
}

function getHealthRatio() {
	return health > 0 ? (health * 1f) / maxHealth : 0;
}

function heal(amount : int) {
	health = (health + amount > 100) ? 100 : amount + health;
}

function isAlive() {
	if (Global.godMode && transform.gameObject.name.Substring(0,6) == "Player") return true;
	if(health < 1 && transform.name=="Player(Clone)") djAudioStuff.Play();
	return health > 0;
}

function isAliveUpdate() {
	if (Global.godMode && transform.gameObject.name.Substring(0,6) == "Player") { wasAlive = true; return true; }
	wasAlive = health > 0;
	return health > 0;
}