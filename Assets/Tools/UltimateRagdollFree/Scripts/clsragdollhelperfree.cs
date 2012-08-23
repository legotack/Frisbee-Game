using UnityEngine;
using System.Collections;

/// <summary>
/// 2011-10-13
/// ULTIMATE RAGDOLL GENERATOR V1.6
/// © THE ARC GAMES STUDIO 2011
/// DESIGNED WITH UNITY 3.4.1f5
/// 
/// helper class to trigger the ragdoll function in a gameobject with a ragdollifier attached
/// </summary>
public class clsragdollhelperfree : MonoBehaviour {
	public Transform varkinetifiedchar;
	
	private bool varcanragdoll = false;
	private clsragdollifyfree varlocalragdollifier;
	
	void Start () {
		animation.wrapMode = WrapMode.Loop;
		varlocalragdollifier = GetComponent<clsragdollifyfree>();
		if (varlocalragdollifier != null) {
			if (varlocalragdollifier.vargamragdoll != null)
				varcanragdoll = true;
		}
		if (varkinetifiedchar != null)
			varkinetifiedchar.animation.wrapMode = WrapMode.Loop;
	}
	
	void OnGUI() {
		if (varcanragdoll) {
			if(GUI.Button(new Rect(0,150,100,20),"Go ragdoll")) {
				//call the 'go driven' method of lerpz, the kinetified character, to turn it into a physics driven game object
				if (varkinetifiedchar != null) {
					if (varkinetifiedchar.GetComponent<clskinetify>() != null) {
						varkinetifiedchar.animation.Stop();
						varkinetifiedchar.GetComponent<clskinetify>().metgodriven();
					}
				}
				//ragdollify the soldier
				varlocalragdollifier.metgoragdoll();
				//Destroy(gameObject);

			}
		}
	}
	
}
