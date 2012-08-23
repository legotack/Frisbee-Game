using UnityEngine;
using System.Collections;

public class clsactorcontroller : MonoBehaviour {
	public float vargamspeed = 5;
	public float vargamrotspeed = 10;
	public float vargravity = 20;
	private CharacterController varcontroller;
	private Vector3 varmovement;
	
	void Awake() {
		varcontroller = GetComponent<CharacterController>();
	}

	// Update is called once per frame
	void Update () {
		if (varcontroller != null) {
			transform.Rotate(Vector3.up*(vargamrotspeed*Time.deltaTime));
			varmovement = transform.forward*(vargamspeed*Time.deltaTime);
			if (!varcontroller.isGrounded)
				varmovement.y = -vargravity*Time.deltaTime;
			varcontroller.Move(varmovement);
		}
	}
}
