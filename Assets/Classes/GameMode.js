#pragma strict

class GameMode {
	
	protected var game : gameHandler;
	protected var player : Transform;
	protected var enemies : Array;
	protected var hasWon : boolean;
	
	public var stats : Stats;
	
	var isDone : boolean;
	
	function GameMode() {
		isDone = false;
		hasWon = false;
	}
	
	function setup() {
		spawnPlayer();
		stats = new Stats();
		enemies = new Array();
	}
	
	function update() {
	}
	
	function onGUI() {
	}
	
	function endGame(hasWon : boolean) {
		isDone = true;
		this.hasWon = hasWon;
		if (! hasWon)
			stats.die();
	}
	
	function setMap(game : gameHandler) {
		this.game = game;
	}
	
	function shouldRespawn(player : Transform) {
		return false;
	}
	
	function spawnPlayer() {
		player = game.Instantiate(game.player,autoSpawnPoint.playerSpawnPoint,game.player.rotation);
		AI.target = player;
	}
	
	function spawnEnemy(spawnPoint : Vector3) {
		return game.Instantiate(game.enemy,spawnPoint,game.enemy.rotation);
	}
	
	function restartGame() {
		return new GameMode();
	}
	
	function clearAllEnemies() {
		var enemy : Transform;
		for (var i : int = 0; i < enemies.length; i++) {
			enemy = enemies[i];
			if (enemy) game.Destroy(enemy.gameObject);
		}
		enemies = new Array();
	}
	
	function drawEndGameScreen() {
	}
	
	function drawResultBox(text : String) { //TODO categories and stuff, table
		GUIHandler.box(Rect(200,200,Screen.width - 400,Screen.height - 400),text);
		if (GUIHandler.button(215,Screen.height - 245,50,30,"Retry")) {
			mainMenu.selectedGamemode = restartGame();
			Application.LoadLevel(Application.loadedLevelName);
		}
		if (GUIHandler.button(Screen.width - 265,Screen.height - 245,50,30,"Quit"))
			Application.LoadLevel("MainMenu");
	}

}