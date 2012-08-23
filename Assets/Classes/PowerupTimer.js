#pragma strict

class PowerupTimer extends Timer {

	var maxPowerupTime : float;
	private var powerupTime : float;
	
	var activated : boolean;

	function PowerupTimer(t : float) {
		maxPowerupTime = t;
		reset();
	}

	function setOn(flag : boolean) {
		activated = flag;
	}
	
	function reset() {
		powerupTime = 0;
		setOn(false);
	}
	
	function getRawValue() {
		return powerupTime / maxPowerupTime;
	}

	function update() {
		if (activated && powerupTime < maxPowerupTime)
			powerupTime += Time.deltaTime;
	}

}