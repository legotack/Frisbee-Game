#pragma strict

class Store extends playerInteractor{
	
//directly from loadout.js	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//concludes the stuff from loadout.js

	function Update(){
		canBeAccessedByPlayer();
		Debug.Log(GameObject.Find("Player(Clone)").Find("Controller").GetComponent(loadout).weapons);
	}
	
	function canBeAccessedByPlayer(){
		if(Vector3.Distance(transform.position,GameObject.Find("Player(Clone)").transform.position)<7){
			Debug.Log("SHOPPING");
			return true;
		}
		else {return false;}
	}
	
	function OnGUI(){
		if(canBeAccessedByPlayer()){
			GUIHandler.box(Rect(Screen.width/8,Screen.height/8,Screen.width/8*6,Screen.height/8*6),"Available Frisbees");
			for(var j:int=0;j<frisbees.Length;j++){
				if(GUIHandler.button(Screen.width/8+Screen.width/32+j*150,Screen.height/8+Screen.height/32,130,70,frisbeeNameExtract(frisbees[j].ToString()))){
					addItemToPlayer(j);
				}
			}
		}
	}
	
	function addItemToPlayer(weaponIndex:int){
		var playerLoadout:loadout = GameObject.Find("Player(Clone)").Find("Controller").GetComponent(loadout);
		var boughtWeapon : InventoryWeapon = weapons[weaponIndex];
		for(var y:int=0;y<playerLoadout.weapons.length;y++){
			var remoteWeaponsY : InventoryWeapon = playerLoadout.weapons[y];
			if(boughtWeapon.weaponName == remoteWeaponsY.weaponName){
				addAmmoToFrisbee(y);
				return;
			}
		}
		playerLoadout.weapons.Add(weapons[weaponIndex]);
	}
	
	function addAmmoToFrisbee(weaponIndex:int){
		var playerLoadout:loadout = GameObject.Find("Player(Clone)").Find("Controller").GetComponent(loadout);
		var playerWeapons : InventoryWeapon = playerLoadout.weapons[weaponIndex];
		playerWeapons.ammoCounter.getMoreAmmo();
	}
}