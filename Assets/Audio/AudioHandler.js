#pragma strict
var hurtNoise : AudioClip;
var endGame : AudioClip;
var deathNoise : AudioClip;
var frisbeeToss : AudioClip;

@script RequireComponent(AudioSource)
function Start() {
}

function playFrisbeeToss() {audio.PlayOneShot(frisbeeToss);}
function playHurtNoise() {audio.PlayOneShot(hurtNoise);}
function playEndGame() {audio.PlayOneShot(endGame);}
function playDeathNoise() {audio.PlayOneShot(deathNoise);}
