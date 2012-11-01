#pragma strict

class Stats {

	private var xp : int;
	private var kills : int;
	private var deaths: int;
	private var wavesCleared : int;

	public function Stats(xp : int, kills : int, deaths : int, wavesCleared : int) {
		this.xp = xp;
		this.kills = kills;
		this.deaths = deaths;
		this.wavesCleared = wavesCleared;
	}
	
	public static function loadFromFile(file : String) : Stats {
	}
	
	private function getRatio(x : int, y : int) : float {
		return truncate(1f * x / ((y == 0) ? 1 : y),100);
	}
	
	private function truncate(v : float, digit : int) : float {
		return Mathf.Floor(v * digit) * digit;
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