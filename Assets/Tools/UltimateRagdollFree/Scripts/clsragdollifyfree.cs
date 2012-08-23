using UnityEngine;
using System.Collections;

/// <summary>
/// 2011-09-15
/// RAGDOLLIFIER COMPANION
/// © THE ARC GAMES STUDIO 2011
/// DESIGNED WITH UNITY 3.4.0f5
/// 
/// This is a very simple helper class that you can use to turn your models into ragdolls at any time.
/// 1- create a ragdoll from your model using URG!
/// 2- save the ragdoll in a new prefab (you might want to call it <originalmodelname>_ragdoll,
/// 	for example if you have a 'ratman' prefab, you can create a 'ratman_ragdoll' prefab.
/// 3- attach this script to your original prefab (i.e. 'ratman')
/// 4- drag the ragdoll prefab into this script's 'ragdoll' slot in the inspector
/// 5- whenever you need it, call the 'go_ragdoll' function from the clsragdollify component
/// 	NOTE: the two armatures must be identical, otherwise the procedure won't work properly
/// </summary>
public class clsragdollifyfree : MonoBehaviour {
	public Transform vargamragdoll;
	
	/// <summary>
	/// copy the transforms from one armature to the other
	/// </summary>
	/// <param name="varpsource">
	/// source object
	/// </param>
	/// <param name="varpdestination">
	/// destination object
	/// </param>
	private void metcopytransforms(Transform varpsource, Transform varpdestination) {
		varpdestination.position = varpsource.position;
		varpdestination.rotation = varpsource.rotation;
		foreach (Transform varchild in varpdestination) {
			Transform varcurrentsource = varpsource.Find(varchild.name);
			if (varcurrentsource)
				metcopytransforms(varcurrentsource, varchild);
		}
	}
	
	/// <summary>
	/// Instantiates the vargamragdoll object, which should correspond to a ragdoll, and copies the two poses to allow a smooth transition
	/// </summary>
	public void metgoragdoll() {
		Transform varnewragdoll = Instantiate(vargamragdoll, transform.position, transform.rotation) as Transform;
		metcopytransforms(transform,varnewragdoll);
	}
	
}
