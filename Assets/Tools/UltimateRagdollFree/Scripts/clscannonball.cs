using UnityEngine;
using System.Collections;

public class clscannonball : MonoBehaviour {
	public bool vargamenabled = true;
	public clscannon varcannon = null;
	
	void OnCollisionEnter() {
		Debug.LogError("Collided?");
		if (vargamenabled) {
			if (varcannon != null)
				varcannon.metresetactor();
		}
		vargamenabled = false;
	}
}
