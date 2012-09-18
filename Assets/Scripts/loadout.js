#pragma strict

var frisbees : Transform[];
var weapons : Array;

function Awake() {
	weapons = new Array();
	
	for (var i : int = 0; i < frisbees.Length; i++) {
		var priceGet:frisbeeMotion = frisbees[i].GetComponent(frisbeeMotion);
		weapons.Add(new InventoryWeapon(frisbees[i],frisbeeNameExtract(frisbees[i].ToString()),priceGet.price));
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