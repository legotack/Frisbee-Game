#pragma strict
var backgroundMusic : AudioClip[];
private var loopNum : int; 

function Start () {
	loopNum = 0;
	audio.clip = backgroundMusic[loopNum];
	audio.Play();
}
function Update () {
	if(audio.time > audio.clip.length-8){
		loopNum +=1;
		audio.clip = backgroundMusic[loopNum%backgroundMusic.Length];
		audio.Play();
		Debug.Log("switching clip");
	}
	else {Debug.Log("Song is playing "+audio.time);}
	Debug.Log(loopNum%backgroundMusic.Length);
}
