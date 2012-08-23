#pragma strict

class InventoryWeapon {

	var weapon : Transform;
	var reloadTimer : ReloadTimer;
	var powerupTimer : PowerupTimer;
	var ammoCounter : AmmoCounter;

	function InventoryWeapon(w : Transform) {
		weapon = w;
		reloadTimer = new ReloadTimer(weapon.GetComponent(frisbeeMotion).reloadTime);
		powerupTimer = new PowerupTimer(weapon.GetComponent(frisbeeMotion).frisbeePowerupTime);
		ammoCounter = new AmmoCounter(weapon.GetComponent(frisbeeMotion).startingAmmo);
	}

}