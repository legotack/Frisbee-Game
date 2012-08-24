#pragma strict

class AmmoCounter {

	var ammo : int;
	var isInfinite : boolean;
	final var ammoIncrement : int;

	function AmmoCounter(startingAmmo : int) {
		ammo = startingAmmo;
		ammoIncrement = ammo;
		isInfinite = startingAmmo == 0;
	}
	
	function takeShot() {
		if (! isInfinite)
			ammo --;
	}
	
	function hasEnoughAmmo() {
		return ammo > 0 || isInfinite;
	}
	
	function getMoreAmmo() {
		ammo += ammoIncrement;
	}

}