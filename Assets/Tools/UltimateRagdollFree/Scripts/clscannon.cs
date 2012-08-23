using UnityEngine;
using System.Collections;

public class clscannon : MonoBehaviour {
	public Transform vargamactor;
	public Transform vargamactorspawnpoint;
	public Transform vargamcannonball;
	public Transform vargamcannonballspawn;
	public float vargammaxcharge = 100;
	public float vargamchargespeed = 100;
	public float vargamfirerate = 1;
	private float varcannonballforce = 15000;
	private float varlastfired = 0;
	private float varcharge = 0;
	private Rect varchargelabel = new Rect(0,200,300,50);
	private Transform varcannonball = null;
	
	void OnMouseDrag() {
		varcharge = (varcharge + Time.deltaTime * vargamchargespeed) % vargammaxcharge;
	}

	void OnMouseUp() {
		if (vargamcannonballspawn != null)
			if (vargamcannonball != null && vargamcannonballspawn != null) {
				if (Time.timeSinceLevelLoad-varlastfired > vargamfirerate) {
					varcannonball = Instantiate(vargamcannonball, vargamcannonballspawn.transform.position, vargamcannonballspawn.transform.rotation) as Transform;
					varcannonball.transform.parent = transform;
					varcannonball.rigidbody.isKinematic = false;
					if (varcannonball.GetComponent<clscannonball>()!=null)
						varcannonball.GetComponent<clscannonball>().varcannon = this;
					varlastfired = Time.timeSinceLevelLoad;
					varcannonball.rigidbody.AddForce(vargamcannonballspawn.transform.forward*(varcannonballforce*(varcharge/vargammaxcharge)));
				}
			}
		varcharge = 0;
	}
	
	public void metresetactor() {
		if (vargamactor != null && vargamactorspawnpoint != null)
			Instantiate(vargamactor,vargamactorspawnpoint.position,Quaternion.identity);
	}
	
	void OnGUI() {
		if (Time.timeSinceLevelLoad-varlastfired < vargamfirerate)
			GUI.contentColor = Color.red;
		else
			GUI.contentColor = Color.green;
		GUI.Label(varchargelabel,"Cannon charge: " + varcharge + "\n(click the cannon)");
	}
	
}
