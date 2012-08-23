using UnityEngine;
using System.Collections;

/// <summary>
/// 2011-10-25
/// URG-ENTITIES NODE CLASS FOR SPECIAL BODY PART OPERATIONS
/// © THE ARC GAMES STUDIO 2011
/// DESIGNED WITH UNITY 3.4.2f2
/// 
/// FIRST DESIGN STAGE
/// 
/// This is an advanced helper class that's intended to function like a tree for storing
/// URGed object data, and to easily allow actions based on ragdoll exploration routines
[System.Serializable]
public class clsurgentnodes {
	//We use a hardcoded extensions list for accessibility
	public Transform[] vargamspine;
	public Transform[] vargamhead;
	public Transform[] vargamarmleft;
	public Transform[] vargamarmright;
	public Transform[] vargamlegleft;
	public Transform[] vargamlegright;
}
