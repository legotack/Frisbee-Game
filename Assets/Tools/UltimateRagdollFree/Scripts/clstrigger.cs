using UnityEngine;
using System.Collections;

/// <summary>
/// 2011-09-12
/// ULTIMATE RAGDOLL GENERATOR V1.6
/// © THE ARC GAMES STUDIO 2011
/// DESIGNED WITH UNITY 3.4.1f5
/// 
/// helper class to trigger the physics driven activation of a ragdolled character
/// 1- add a collider to the scene object
/// 2- (if the triggering object has no rigidbody) add a rigidbody to the same scene object, and set it as kinematic
/// 3- add the clskinetify script to the scene object
/// 4- for this example we've set the 'Collider' parameter for easiest approach.
///    Alternatively, the layer collision matrix can be used, from the project options and physics menu.
/// </summary>
public class clstrigger : MonoBehaviour {
	void OnTriggerEnter(Collider varsource) {
		//trigger only with the car's 'bumper' collider
		if (varsource.name == "bumper") {
			//cache the kinetifier
			clskinetify varlocalkinetifier = gameObject.GetComponent<clskinetify>();
			if ( varlocalkinetifier !=null)
				//activate the driving routine
				varlocalkinetifier.metgodriven();
		}
	}
	
		
}
