#pragma strict

/*
	Holds all global variables in a static class
*/

static class Global {
	var godMode : boolean = true;
	var waveStart : int = 100;
	var infiniteAmmo : boolean = false;
	
	var selectedGamemode : GameMode;
}