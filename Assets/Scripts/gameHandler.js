#pragma strict

var player : Transform;
var enemy : Transform;

var gameOverTime : float;

var gamemode : GameMode;
private var audioStuff : AudioSource;

function Start() {
	gamemode = mainMenu.selectedGamemode;
	gamemode.setMap(this);
	gamemode.setup();
	gameOverTime = 0;
	audioStuff = GameObject.Find("Player(Clone)").Find("DJOfAudio").GetComponent(AudioSource);
	
	Physics.IgnoreLayerCollision(9,10);
	Physics.IgnoreLayerCollision(10,11);
}

function Update() {
	if (! gamemode.isDone)
		gamemode.update();
}

function OnGUI() {
	if (gamemode.isDone) {
		autoSpawnPoint.clearExisting();
		GUI.color = GUIHandler.deadScreenOverlay;
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),GUIHandler.monotone,ScaleMode.StretchToFill);
		GUI.color = Color.white;
		gamemode.drawEndGameScreen();
	}
	else
		gamemode.onGUI();
}

function endGame(hasWon : boolean) {
	audioStuff.Stop();
	gamemode.endGame(hasWon);
}