#pragma strict

class InventoryWeapon {

	var weapon : Transform;
	var weaponName : String;
	var reloadTimer : ReloadTimer;
	var powerupTimer : PowerupTimer;
	var ammoCounter : AmmoCounter;

	function InventoryWeapon(w : Transform, name : String) {
		weapon = w;
		weaponName = name;
		reloadTimer = new ReloadTimer(weapon.GetComponent(frisbeeMotion).reloadTime);
		powerupTimer = new PowerupTimer(weapon.GetComponent(frisbeeMotion).frisbeePowerupTime);
		ammoCounter = new AmmoCounter(weapon.GetComponent(frisbeeMotion).startingAmmo);
	}

}