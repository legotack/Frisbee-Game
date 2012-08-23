#pragma strict

class RespawnTimer extends Timer {

	var maxRespawnTime : float;
	private var respawnTime : float;
		
	function RespawnTimer(m : float) {
		maxRespawnTime = m;
		respawnTime = 0;
	}
	
	function update() {
		if (respawnTime < 4)
			respawnTime += Time.deltaTime;
	}
	
	function getRawValue() {
		return respawnTime / maxRespawnTime;
	}

}