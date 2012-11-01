#pragma strict

class Stats {

	private static final var XP_PER_KILL : int = 10;
	private static final var XP_PER_WAVE : int = 100;

	private var xp : int;
	private var kills : int;
	private var deaths: int;
	private var wavesCleared : int;

	public function Stats() {
		xp = 0;
		kills = 0;
		deaths = 0;
		wavesCleared = 0;
	}
	
	public function Stats(file : String) {
	}
	
	private function getRatio(x : int, y : int) : float {
		return truncate(1f * x / ((y == 0) ? 1 : y),100);
	}
	
	private function truncate(v : float, digit : int) : float {
		return Mathf.Floor(v * digit) * digit;
	}
	
	public function kill() : void {
		kills++;
		xp += XP_PER_KILL;
	}
	
	public function die() : void {
		deaths++;
	}
	
	public function clearWave(number : int) : void {
		wavesCleared++;
		xp += XP_PER_WAVE * number;
	}
	
	public function awardXP(xp : int) : void {
		this.xp += xp;
	}
	
	public function add(stats : Stats) : void {
		xp += stats.xp;
		kills += stats.kills;
		deaths += stats.deaths;
		wavesCleared += stats.wavesCleared;
	}
	
	public function getLevel() : int {
		return Mathf.FloorToInt(Mathf.Sqrt(xp));
	}
	
	public function getRemainingXP() : int {
		return xp - Mathf.Pow(getLevel(),2);
	}
	
	public function getKDR() : float {
		return getRatio(kills, deaths);
	}
	
	public function getWavesPerDeath() : float {
		return getRatio(wavesCleared, deaths);
	}

}