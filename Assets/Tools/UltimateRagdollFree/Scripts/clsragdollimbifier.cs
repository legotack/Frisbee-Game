using UnityEngine;
using System.Collections;

/// <summary>
/// 2011-10-30
/// ULTIMATE RAGDOLL GENERATOR V1.8
/// © THE ARC GAMES STUDIO 2011
/// DESIGNED WITH UNITY 3.4.2f2
/// 
/// Helper class to showcase advanced ragdoll functions based on the URG entities manager
/// 
/// USAGE NOTE: the animation component's "ANIMATE PHYSICS" of the source must be checked.
/// 
/// </summary>
public class clsragdollimbifier : MonoBehaviour {
	//drag an URGent game object in the slot to use this class
	public clsurgent vargamurgentities = null;
	
	void Start() {
		//if we don't have a remote target, we search the URGent manager in our gameobject
		if (vargamurgentities == null)
			vargamurgentities = GetComponent<clsurgent>();
		//we automatically enable the physics animation, required to interact physically with kinematic objects
		if (transform.root.animation)
			transform.root.animation.animatePhysics = true;
	}
	
	void OnGUI() {
		if (vargamurgentities != null) {
			if (GUILayout.Button("Break left arm")) {
				//this first instruction disconnects the parent from the animation, so that it can
				//react to physics
				vargamurgentities.vargamnodes.vargamarmleft[0].parent = vargamurgentities.transform;
				//drive the limb
				clsurgutils.metdrivebodypart(vargamurgentities, clsurgutils.enumparttypes.arm_left,0);
			}
			
			if (GUILayout.Button("Break right arm")) {
				vargamurgentities.vargamnodes.vargamarmright[0].parent = vargamurgentities.transform;
				clsurgutils.metdrivebodypart(vargamurgentities, clsurgutils.enumparttypes.arm_right,0);
			}
			
			if (GUILayout.Button("Break left leg")) {
				vargamurgentities.vargamnodes.vargamlegleft[0].parent = vargamurgentities.transform;
				clsurgutils.metdrivebodypart(vargamurgentities, clsurgutils.enumparttypes.leg_left,0);
			}
			
			if (GUILayout.Button("Break right leg")) {
				vargamurgentities.vargamnodes.vargamlegright[0].parent = vargamurgentities.transform;
				clsurgutils.metdrivebodypart(vargamurgentities, clsurgutils.enumparttypes.leg_right,0);
			}
			
			//This extension can not be used if the neck is not connected to the arms, which is often the case
			//if (GUILayout.Button("Break neck"))
			//	clsurgutils.metdrivebodypart(vargamurgentities, clsurgutils.enumparttypes.leg_right,0);
			if (GUILayout.Button("URG!")) {
				clsurgutils.metdriveurgent(vargamurgentities,null);
				vargamurgentities.transform.animation.Stop();
				vargamurgentities.transform.animation.animatePhysics = false;
				//note the intentional search of the character controller in the root
				CharacterController varcontroller = vargamurgentities.transform.root.GetComponent<CharacterController>();
				if (varcontroller != null) {
					Vector3 varforce = varcontroller.velocity;
					varforce.y = 0.1f;
					Destroy(varcontroller);
					vargamurgentities.vargamnodes.vargamspine[0].rigidbody.AddForce(varforce*7500);
				}
			}
		}
	}
	
}
