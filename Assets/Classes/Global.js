#pragma strict

/*
	Holds all global variables in a static class
*/

static class Global {

	var godMode : boolean = false;
	var waveStart : int = 1;
	var infiniteAmmo : boolean = false;
	var madHops : boolean = false;
	var startBalance : int = 100;
	var balance : int = startBalance;
	
	var selectedGamemode : GameMode;

}