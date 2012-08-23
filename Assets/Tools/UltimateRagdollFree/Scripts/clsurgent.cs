using UnityEngine;
using System.Collections;

/// <summary>
/// 2011-10-25
/// URG-ENTITIES, CLASS FOR SPECIAL BODY PART OPERATIONS
/// © THE ARC GAMES STUDIO 2011
/// DESIGNED WITH UNITY 3.4.2f2
/// 
/// FIRST DESIGN STAGE
/// 
/// USAGE NOTE: URG has a hard coded reference for 'clsurgent' and 'clsurgentactuator' classes
/// user can change them at will, but needs be sure that these always exist when creating URGent
/// ragdolls
/// 
/// This is an advanced helper class that is responsible for body part operations
/// and that stores the URGed structure to easily access and interact with ragdolled body parts
public class clsurgent : MonoBehaviour {
	//the list of the nodes that constitute the ragdoll
	public clsurgentnodes vargamnodes = new clsurgentnodes();
	
	void Start() {
		animation.wrapMode = WrapMode.Loop;
		animation.animatePhysics = true;
	}	
	
	public void metcollsionentered(Transform varpbodypart) {
		//line commented for release polish. uncomment to monitor urg manager collider events
		//Debug.LogError("manager collider event" + varpbodypart.name + " " + varpbodypart.root.name);
	}
	
	public void metcollidertriggered(Transform varpbodypart) {
		//line commented for release polish. uncomment to monitor urg manager trigger events
		//Debug.LogError("manager trigger event" + varpbodypart.name + " " + varpbodypart.root.name);
	}
	
}
