#pragma strict

var frisbees : Transform[];
var weapons : Array;

function Awake() {
	weapons = new Array();
	for (var i : int = 0; i < frisbees.Length; i++) {
		weapons.Add(new InventoryWeapon(frisbees[i],frisbeeNameExtract(frisbees[i].ToString())));
	}
}

function hasWeaponIndex(i : int) {
	return i < weapons.length;
}

//omg regular expression
function frisbeeNameExtract(raw:String){
	var parts = raw.Split("("[0]);
	return parts[0];
}