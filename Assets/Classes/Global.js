#pragma strict

/*
	Holds all global variables in a static class
*/

static class Global {
	var godMode : boolean = true;
	var waveStart : int = 1;
	var infiniteAmmo : boolean = false;
	var madHops : boolean = true;
	
	var selectedGamemode : GameMode;
}