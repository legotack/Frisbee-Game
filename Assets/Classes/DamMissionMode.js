#pragma strict

class DamMissionMode extends GameMode {

	function DamMissionMode() {
		super();
	}
	
	function setup() {
		for (var i : int = 0; i < autoSpawnPoint.spawnPoints.length; i++)
			spawnEnemy(autoSpawnPoint.spawnPoints[i]);
		super.setup();
	}
	
	function restartGame() {
		return new DamMissionMode();
	}

}