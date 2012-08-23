#pragma strict

var frisbees : Transform[];
var weapons : Array;

function Awake() {
	weapons = new Array();
	for (var i : int = 0; i < frisbees.Length; i++) {
		weapons.Add(new InventoryWeapon(frisbees[i]));
	}
}

function hasWeaponIndex(i : int) {
	return i < weapons.length;
}