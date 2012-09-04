#pragma strict

class SurvivalMode extends GameMode {

	private var wave : float;
	private var reinforcementsToBeSpawned : int;
	private var reinforcementTimer : ReloadTimer;
	private var nextWaveTimer : ReloadTimer;

	function SurvivalMode() {
		super();
	}
	
	function setup() {
		wave = Global.waveStart;
		reinforcementTimer = new ReloadTimer(2);
		nextWaveTimer = new ReloadTimer(20);
		super.setup();
		player.gameObject.AddComponent(autoWayPoint);
		spawnWave();
	}
	
	function update() {
		if (reinforcementsToBeSpawned > 0 && reinforcementTimer.canShoot()) {

						spawnReinforcements();
			reinforcementTimer.takeShot();
		}
		else if (! isWaveStillGoing()) {
			nextWaveTimer.update();
			if (nextWaveTimer.canShoot()) {
				nextWaveTimer.takeShot();
				spawnWave();
			}
		}
		reinforcementTimer.update();
		
	}
	
	function onGUI() {
		if (! isWaveStillGoing()) {
			var timeLeft : int = 20 - nextWaveTimer.getValue() * 20;
			GUIHandler.box(Rect(15,15,300,50),"Wave cleared!\nNext wave starts in: " + timeLeft.ToString());
		}
	}
	
	function spawnWave() {
		wave += 1;
		enemies = new Array();
		player.GetComponent(healthManager).heal(100);
		var configuration : Array = autoSpawnPoint.getBestConfiguration(player,2 + 3 * wave);
		for (var i : int in configuration[1])
			enemies.Add(spawnEnemy(autoSpawnPoint.spawnPoints[i]));
		reinforcementsToBeSpawned = configuration[0];
		if (reinforcementTimer.canShoot())
			reinforcementTimer.takeShot();
	}
	
	function spawnReinforcements() {
		for (var spawnPoint : Vector3 in autoSpawnPoint.spawnPoints)
			enemies.Add(spawnEnemy(spawnPoint));
		reinforcementsToBeSpawned --;
	}
	
	function isWaveStillGoing() {
		for (var i : int = 0; i < enemies.length; i++) {
			if (enemies[i])
				return true;
		}
		return false;
	}
	
	function drawEndGameScreen() {
		clearAllEnemies();
		drawResultBox("You survived " + (wave - 1) + " rounds");
	}
	
	function restartGame() {
		return new SurvivalMode();
	}

}