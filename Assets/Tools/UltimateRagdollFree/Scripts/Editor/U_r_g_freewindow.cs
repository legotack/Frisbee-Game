using UnityEngine;
using System.Collections;
using UnityEditor;
using U_r_g_freelib;

public class U_r_g_freewindow : U_r_g_free {

	[MenuItem ("GameObject/Create Other/Ultimate ragdoll free...")]
    public static void Init () {
		EditorWindow.GetWindow (typeof (U_r_g_freewindow),true,"Ultimate Ragdoll Generator Free Version");
    }
}