using UnityEngine;
using System.Collections;

/// <summary>
/// 2011-11-01
/// ULTIMATE RAGDOLL GENERATOR V1.8
/// © THE ARC GAMES STUDIO 2011
/// DESIGNED WITH UNITY 3.4.2f2
/// 
/// the class is used as initializer for the "Fixed timestep" parameter of the
/// EDIT=> PROJECT SETTINGS=> TIME menu, that determines the frequency of physic updates for the game
/// It is suggested that the value be kept consistent throughout development to avoid
/// unexpected physic behavior
/// </summary>
public class clstimemanager : MonoBehaviour {
	
	void Awake() {
		//set the Fixed timestep to 100 calls
		Time.fixedDeltaTime = 0.01f;
		//set the minimum collision detection
		Physics.minPenetrationForPenalty = 0.01f;
		//set the collision matrix to comply with actor controller and missiles
		Physics.IgnoreLayerCollision(2,0);
	}
}
