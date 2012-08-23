using UnityEngine;

/// <summary>
/// 2011-10-25
/// RAGDOLLIFIER UTILITIES
/// © THE ARC GAMES STUDIO 2011
/// DESIGNED WITH UNITY 3.4.1fa
/// 
/// This is an advanced helper class which hosts all global URG! utilities
public static class clsurgutils {
	
	/// <summary>
	/// This procedure's objective is to set varpsource's joint connected body property, assigning
	/// varptarget's rigidbody to it, and eventually adding or modifying preexisting such elements
	/// </summary>
	/// <param name="varpsource">
	/// The source object, which hosts the joint component that will get varptargets' rigidbody reference
	/// </param>
	/// <param name="varptarget">
	/// A <see cref="Transform"/>
	/// The object that will effectively become the physical parent of varpsource' joint
	/// </param>
	/// A <see cref="System.Boolean"/>
	/// If true, will add the required components if they don't exist, or replace existing components values
	/// if the component exist. If false and the components exist, will not replace existing component values
	/// </param>
	/// <returns>
	/// A <see cref="System.Int32"/>
	/// 0 if one or both of the bodies were null.
	/// 1 if procedure completed successfully.
	/// </returns>
	public static int metconnectbodies(Transform varpsource, Transform varptarget, bool varpreplace) {
		int varreturnvalue = 0;
		Joint varcurrentjoint;
		Rigidbody varcurrentbody;
		//check if the bodies are null since we can't proceed in such case
		if (varpsource != null && varptarget != null) {
			//fetch the components
			varcurrentjoint = varpsource.gameObject.GetComponent<Joint>();
			varcurrentbody = varptarget.gameObject.GetComponent<Rigidbody>();
			//check if the retrieved joint is null in which case we add it to the source
			if (varcurrentjoint == null) {
				varcurrentjoint = varpsource.gameObject.AddComponent<CharacterJoint>();
			}
			//check if the retrieved rigidbody is null in which case we add it to the target
			if (varcurrentbody == null) {
				varcurrentbody = varptarget.gameObject.AddComponent<Rigidbody>();
			}
			//check if we can replace, or if we can't replace but there's no connected body in our joint, or if the joint is already connected to the body
			if (varpreplace == true || (varpreplace == false && ((varcurrentjoint.connectedBody == null || varcurrentjoint.connectedBody == varcurrentbody)))) {
				//we perform the replacement only if actually different
				if (varcurrentjoint.connectedBody != varcurrentbody)
					varcurrentjoint.connectedBody = varcurrentbody;
				//succesful operation, set up here as functionality expansion placeholder
				varreturnvalue = 1;
			}
		}
		//return the current result
		return varreturnvalue;
	}
	
	/// <summary>
	/// Static instance of the clskinetify utility, that turns a kinematic ragdoll into a driven ragdoll.
	/// This procedure is particularly useful to animate 'roadside' objects or scenery objects that need to become physical when they
	/// receive a trigger (or otherwise a collision when implemented like so) using this class can save time and resources in those
	/// cases, since it avoids the use of a specific ragdoll prefab and a separate scripted gameobject
	/// </summary>
	public static void metgodriven(Transform varpsource) {
		//retrieve all the rigidbodies of the current gameobject
		Rigidbody[] varrigidbodies;
		varrigidbodies = varpsource.GetComponentsInChildren<Rigidbody>();
		//cycle the rigidbodies and turn them into physics driven objects
		foreach (Rigidbody varcurrentrigidbody in varrigidbodies) {
			varcurrentrigidbody.isKinematic = false;
		}
	}
	
	/// <summary>
	/// URG entities alternative to metgodriven. Will scan the urgent array and ragdollify all children of the parameter part.
	/// Accessing this procedure is convenient in terms of efficiency and cpu since it's 'cheaper' than getcomponentsinchildren, when
	/// the source is based on the actual URGent armature
	/// NOTE: can be used to URG drive a clsurgent gameobject, when the actuator is passed as null
	/// </summary>
	/// <param name="varpsource">
	/// The URG entities manager which holds the armature structure data for the actuator
	/// </param>
	/// <param name="varpactuator">
	/// The actuator that will become driven, followed by its children. If this parameter is null, all the ragdoll will be URG driven.
	/// </param>
	public static void metdriveurgent(clsurgent varpsource, clsurgentactuator varpactuator) {
		if (varpsource == null) {
			Debug.LogError("Received a null parameter: " + varpsource + " - " + varpactuator);
			return;
		}
		//check if the actuator is null, of ir it's the source, in which case drive all body parts
		if (varpactuator == null || varpactuator.transform == varpsource.vargamnodes.vargamspine[0]) {
			metdrivebodypart(varpsource,enumparttypes.head,0);
			metdrivebodypart(varpsource,enumparttypes.arm_left,0);
			metdrivebodypart(varpsource,enumparttypes.arm_right,0);
			metdrivebodypart(varpsource,enumparttypes.leg_left,0);
			metdrivebodypart(varpsource,enumparttypes.leg_right,0);
			metdrivebodypart(varpsource,enumparttypes.spine,0);
		}
		//otherwise just call the drive procedure on the specified body part and index
		else {
			metdrivebodypart(varpsource,varpactuator.vargamparttype,varpactuator.vargampartindex);
		}
	}

	/// <summary>
	/// Auxilliary function to drive an urgent object, can be used to directly ragdollimbify a body part without the need
	/// of a collision or trigger effect
	/// </summary>
	/// <param name="varpsource">
	/// The URG entities manager which holds the armature structure data for the limb
	/// </param>
	/// <param name="varppart">
	/// The body part type
	/// </param>
	/// <param name="varppartindex">
	/// The source part index, which will be driven followed with its children
	/// </param>
	public static void metdrivebodypart(clsurgent varpsource, clsurgutils.enumparttypes varppart, int varppartindex) {
		//determine the body part
		if (varpsource != null) {
			Transform[] varcurrentbodypart = new Transform[0];
			switch (varppart) {
				case enumparttypes.spine:
					varcurrentbodypart = varpsource.vargamnodes.vargamspine;
					break;
				case enumparttypes.head:
					varcurrentbodypart = varpsource.vargamnodes.vargamhead;
					break;
				case enumparttypes.arm_left:
					varcurrentbodypart = varpsource.vargamnodes.vargamarmleft;
					break;
				case enumparttypes.arm_right:
					varcurrentbodypart = varpsource.vargamnodes.vargamarmright;
					break;
				case enumparttypes.leg_left:
					varcurrentbodypart = varpsource.vargamnodes.vargamlegleft;
					break;
				case enumparttypes.leg_right:
					varcurrentbodypart = varpsource.vargamnodes.vargamlegright;
					break;
				default:
					Debug.LogError("Unmanaged part type");
					break;
			}
			//cycle 'outwards' in the parts list, and set the part as physics driven
			for (int varcounter = varppartindex; varcounter < varcurrentbodypart.Length; varcounter++) {
				varcurrentbodypart[varcounter].rigidbody.isKinematic = false;
			}
		}
		else {
			Debug.LogError("Received a request to URG drive a null source");
		}
	}
	
	/// <summary>
	/// Basic function to determine a body part's path in respect to its source.
	/// NOTE: the path does NOT include the root.
	/// </summary>
	/// <param name="varpsource">
	/// The source transform
	/// </param>
	/// <returns>
	/// The string path that leads from varpsource's root to its transform
	/// </returns>
	public static string metbuildpartpath(Transform varpsource) {
		Transform varcurrentpart = varpsource;
		string varreturnvalue = "";
		string varseparator = "";
		while (varcurrentpart != null && (varcurrentpart.parent != null)) {
			varreturnvalue = varcurrentpart.name + varseparator + varreturnvalue;
			varcurrentpart = varcurrentpart.parent;
			if (varseparator == "")
				varseparator = "/";
				
		}
		return varreturnvalue;
	}
	
	/// <summary>
	/// The global enumerator that defines body parts
	/// </summary>
	public enum enumparttypes {
		head,
		spine,
		arm_left,
		arm_right,
		leg_left,
		leg_right,
	}
}
