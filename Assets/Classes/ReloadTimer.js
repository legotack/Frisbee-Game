#pragma strict

class ReloadTimer extends Timer {

	var maxReloadTime : float;
	private var reloadTime : float;

	function ReloadTimer(t : float) {
		maxReloadTime = t;
	}

	function canShoot() {
		return reloadTime >= maxReloadTime;
	}
	
	function takeShot() {
		reloadTime = 0;
	}

	function update() {
		if (reloadTime < maxReloadTime)
			reloadTime += Time.deltaTime;
	}
	
	function getRawValue() {
		return reloadTime / maxReloadTime;
	}

}