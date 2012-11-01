#pragma strict

class InventoryWeapon {

	var weapon : Transform;
	var weaponName : String;
	var weaponCost : int;
	var reloadTimer : ReloadTimer;
	var powerupTimer : PowerupTimer;
	var ammoCounter : AmmoCounter;
	var cost : int;

	function InventoryWeapon(w : Transform, name : String, frisbeePrice : int) {
		weapon = w;
		weaponName = name;
		cost = frisbeePrice;
		reloadTimer = new ReloadTimer(weapon.GetComponent(frisbeeMotion).reloadTime);
		powerupTimer = new PowerupTimer(weapon.GetComponent(frisbeeMotion).frisbeePowerupTime);
		ammoCounter = new AmmoCounter(weapon.GetComponent(frisbeeMotion).startingAmmo);
	}

}