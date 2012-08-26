#pragma strict

var player : Transform;
var enemy : Transform;

var gameOverTime : float;

var gamemode : GameMode;

function Start() {
	gamemode = mainMenu.selectedGamemode;
	gamemode.setMap(this);
	gamemode.setup();
	gameOverTime = 0;
	
	Physics.IgnoreLayerCollision(9,10);
	Physics.IgnoreLayerCollision(10,11);
	
	Screen.showCursor = false;
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
	Screen.showCursor = true;
	gamemode.endGame(hasWon);
}