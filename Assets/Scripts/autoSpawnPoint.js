#pragma strict

static var spawnPoints : Array;
static var campaignSpawnPoints : Array;
static var playerSpawnPoint : Vector3;

var spawnOnlyPlayers : boolean;
var notOnlyCampaign : boolean;

function Awake() {
	GetComponent(MeshRenderer).enabled = false;
	var pos : Vector3 = transform.position + new Vector3(0,1,0);
	if (contains(spawnPoints,pos) || contains(campaignSpawnPoints,pos))
		return;
	if (spawnPoints == null)
		spawnPoints = new Array();
	if (campaignSpawnPoints == null)
		campaignSpawnPoints = new Array();
	if (spawnOnlyPlayers) {
		playerSpawnPoint = pos;
	}
	else if (notOnlyCampaign)
		spawnPoints.Add(pos);
	else
		campaignSpawnPoints.Add(pos);
}

function contains(a : Array, v : Vector3) {
	for (spawnPoint in a)
		if (spawnPoint == v)
			return true;
	return false;
}

static function getBestConfiguration(player : Transform,number : int) {
	var excess : int = number % spawnPoints.length;
	Debug.Log(excess);
	var fullSpawns : int = (number - excess) / spawnPoints.length;
	var result : Array = getIndexOfBestExcessChoices(new Array(spawnPoints),player,new Array(),excess);
	return new Array(fullSpawns,result);
}

private static function getIndexOfBestExcessChoices(ar : Array, player : Transform, n : Array, length : int) : Array {
	if (n.length == length)
		return n;
	var bestIndex : int = 0;
	var distance : float = 0;
	var pos : Vector3;
	for (var i : int = 0; i < ar.length; i++) {
		if (ar[i] != null) {
			pos = ar[i];
			if (Vector3.Distance(player.position,pos) > distance) {
				distance = Vector3.Distance(player.position,pos);
				bestIndex = i;
			}
		}
	}
	ar[bestIndex] = null;
	n.Add(bestIndex);
	return getIndexOfBestExcessChoices(ar,player,n,length);
}

static function clearExisting() {
	spawnPoints = new Array();
	campaignSpawnPoints = new Array();
}