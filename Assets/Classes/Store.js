#pragma strict

class Store extends playerInteractor{
	
//directly from loadout.js	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//concludes the stuff from loadout.js


	//gets called every frame the player is inside
	protected function playerInsideEvent(){
		//Debug.Log(Global.balance);
	}
	
	
	//gets called to deal with GUI every frame the player is inside
	protected function playerInsideGUIEvent(){
		GUIHandler.box(Rect(Screen.width/8,Screen.height/8,Screen.width/8*6,Screen.height/8*6),"Available Frisbees");
		for(var j:int=0;j<frisbees.Length;j++){
			if(GUIHandler.button(Screen.width/8+Screen.width/32+j*150,Screen.height/8+Screen.height/32,130,70,frisbeeNameExtract(frisbees[j].ToString()))){
				addItemToPlayer(j);
			}
		}
	}
		
	function addItemToPlayer(weaponIndex:int){
		if(!canSell(50))return;
		var playerLoadout:loadout = GameObject.Find("Player(Clone)").Find("Controller").GetComponent(loadout);
		var boughtWeapon : InventoryWeapon = weapons[weaponIndex];
		if(!canSell(boughtWeapon.cost))return;
		for(var y:int=0;y<playerLoadout.weapons.length;y++){
			var remoteWeaponsY : InventoryWeapon = playerLoadout.weapons[y];
			if(boughtWeapon.weaponName == remoteWeaponsY.weaponName){
				addAmmoToFrisbee(y);
				Global.balance-=boughtWeapon.cost;
				return;
			}
		}
		playerLoadout.weapons.Add(weapons[weaponIndex]);
		Global.balance-=boughtWeapon.cost+10;
	}
	
	function addAmmoToFrisbee(weaponIndex:int){
		var playerLoadout:loadout = GameObject.Find("Player(Clone)").Find("Controller").GetComponent(loadout);
		var playerWeapons : InventoryWeapon = playerLoadout.weapons[weaponIndex];
		if(playerWeapons.ammoCounter.ammo == playerWeapons.ammoCounter.ammoIncrement) return;
		playerWeapons.ammoCounter.getMoreAmmo();
	}
	
	function canSell(price:int){
		return Global.balance >= price;
	}
}