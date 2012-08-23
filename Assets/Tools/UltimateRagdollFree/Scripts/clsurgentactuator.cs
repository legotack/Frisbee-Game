using UnityEngine;
using System.Collections;

/// <summary>
/// 2011-10-25
/// URG-ENTITIES ACTUATOR CLASS FOR SPECIAL BODY PART OPERATIONS
/// © THE ARC GAMES STUDIO 2011
/// DESIGNED WITH UNITY 3.4.2f2
/// 
/// FIRST DESIGN STAGE
/// 
/// Basic actuator class that will call the URGent source methods on trigger or collision,
/// after processing own physic functions.
/// All body parts will have this class attached to handle collision events, whenever
/// the URGent option is enabled in URG! interface.
/// Naturally, the class can be separately added at will to any gameobject to perform
/// any common physic event, shared with URG entities.
/// An expansion implementation can easily define an 'actuator type' that will serve as
/// a switch to decide which action to perform, to allow for different ragdoll or kinematic
/// behaviors in clsurgent's instance
/// 
/// USAGE NOTE: URG has a hard coded reference for 'clsurgent' and 'clsurgentactuator' classes
/// user can edit them at will, but needs be sure that these two classes always exist when
/// creating URGent ragdolls
/// 
/// NOTE: it is expected and suggested that the game model be ragdolled SEPARATED from its
/// possible prefab parent. Notice in fact the references to vargamurgentsource.transform as the
/// 'root' of the object, to avoid referencing an actual parent that might not be in the original
/// 3D model
/// </summary>
public class clsurgentactuator : MonoBehaviour {
	//the body part type, from body extensions available (head, spine, arms, legs)
	public clsurgutils.enumparttypes vargamparttype;
	//the name of the part to which the instance is attached. can be used as a parameter for URGent calls.
	public string vargampartinstancename = "";
	//the part index in the entities array. Useful value that allows iteration of the part through clsurgutils, with the URGent manager
	public int vargampartindex = 0;
	//basic activator switch. Basically used to avoid unnecessary calls on objects that have alreaby been subjected to physic actions
	public bool vargamactuatorenabled = true;
	//reference to the source root urgent manager class. critical value that stores the URGent manager.
	public clsurgent vargamurgentsource;
	//reference to the transform of this part's ragdoll parent. Caches the part parent.
	public Transform vargamsource;
	
	private void metmanagekinematic() {
		//this condition is used when the script is attached to "scenery", for example a palisade or a fence, or a weapon in the character's hand
		//that needs to become physical and detach from its parent
		if (vargamurgentsource == null) {
			rigidbody.isKinematic = false;
			transform.parent = null;
		}
		else {
			//this instead is the code for the 'death' condition that will make the game object entirely ragdoll driven

			//this condition determines if the current part is head, spine or source, in which case the character is neutralized
			if (transform == vargamsource || vargamparttype == clsurgutils.enumparttypes.head || vargamparttype == clsurgutils.enumparttypes.spine) {
				clsurgutils.metdriveurgent(vargamurgentsource,null);
				vargamurgentsource.transform.animation.Stop();
				vargamurgentsource.transform.animation.animatePhysics = false;
				//if there's a character controller added to the parent gameobject, we destroy it to stop the movement
				//note the intentional search of the character controller in the root
				CharacterController varcontroller = transform.root.GetComponent<CharacterController>();
				if (varcontroller != null) {
					Vector3 varforce = varcontroller.velocity;
					Destroy(varcontroller);
					//this adds a scenic effect to the ragdoll, to simulate inertia
					vargamurgentsource.vargamnodes.vargamspine[0].rigidbody.AddForce(varforce*7500);
				}
			}
			//otherwise we just drive the body part of the actuator
			else {
				clsurgutils.metdriveurgent(vargamurgentsource,this);
				transform.parent = vargamurgentsource.transform;
			}
		}
	}
	
	void OnMouseDown() {
		metmanagekinematic();
	}
	
	void ApplyForce(Rigidbody body) {
		Debug.LogError("Wtf!");
		Vector3 direction = body.transform.position - transform.position;
		body.AddForceAtPosition(direction.normalized, transform.position);
	}
	
	void OnCollisionEnter(Collision varpsource) {
		//lines commented for release polish. uncomment to monitor actuator collision events (attention to non null URGent source)
		//Debug.LogError("actuator collider event "  + transform.name + " " + vargamurgentsource.transform.name);
		//vargamurgentsource.metcollsionentered(transform);
		if (vargamactuatorenabled) {
			//routine code: decrease hitpoints, drop weapon, etc.			
			
			//this example, would require an object tagged 'missile' to activate a collision
			if (varpsource.gameObject.tag == "missile") {
				//Destroy(varpsource.collider); //can be used to avoid multiple collisions, for example with bullets
				if (rigidbody.isKinematic == true) {
					metmanagekinematic();
				}
				//turn off the actuator since it performed its conversion
				vargamactuatorenabled = false;
				//apply the original force
				rigidbody.AddForceAtPosition(varpsource.impactForceSum,varpsource.contacts[0].point, ForceMode.VelocityChange);
			}
		}
	}
	
	void OnTriggerEnter(Collider varpother) {
		//lines commented for release polish. uncomment to monitor actuator trigger events (attention to non null URGent source)
		//Debug.LogError("actuator trigger event " + transform.name + " " + vargamurgentsource.transform.name);
		//vargamurgentsource.metcollidertriggered(transform);
		if (vargamactuatorenabled) {
			//routine code: decrease hitpoints, drop weapon, etc.			
			
			//turn off the actuator since it performed its conversion
			vargamactuatorenabled = false;
		}
	}
}
