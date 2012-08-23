2011-10-23
ULTIMATE RAGDOLL GENERATOR V1.8
© THE ARC GAMES STUDIO 2011
http://unity.thearcgames.com
DESIGNED WITH UNITY 3.4.1f5

CHANGELOG
Version 1.8: "GIANT LEAP"
Additions
- added fake limb extension interface
- added clear physics from source button
- added source connector utility and panel function
- inclued an additional distance check for the extremities finder
- added URGent class, first phase of ragdollimbifier and dismemberator setup
- added the ragdoll wide physic material designator
- added a secondary exploration cycle for better automatic ragdoll source determination
Variations
- slight changes to spine logic for better spine and head results
- gui cleanup, added editor preferences basic handling
Bug fixes
- corrected a joint injection error that made the neck too inflexible

SYNOPSIS

Thanks for using URG! The ultimate ragdoll generator.

Ragdoll is the term that identifies a 3d model's ability to react to physics in 3d scenes, usually when it's required for the object to fall down or tumble.
Ragdolls are one of today's fundamental game elements since they're often fun and spectacular. Be it a 2d platform or a 3d first person shooter, your game will without a doubt benefit from good ragdoll characters.
Ultimate ragdoll generator is the perfect tool to instantly create awesome ragdolls from any model, saving you the complex and tedious work of setting and fine tuning all of the physics elements that you need to add to a 3d model to make it into a ragdoll.
The default options are weighed to be suitable for all rigged humanoid game models, especially if they're symmetrical and in their T-POSE. The tool works ideally with straight boned armatures that resemble unity's 'standard', of the following type (this diagram represents the names of the bones and their side of the armature):
			
elbow.r	arm.r	head	arm.l	elbow.l
				middlespine
				root
			hip.r	hip.l
			knee.r	knee.l
			foot.r	foot.l

However URG! is equally good in taking care of more complex models, up to a theoretically unlimited number of bones (as long as there's system memory to handle them). Additionally, for desperately improperly rigged models, URG! is designed to only stop at critical errors, so that you can eventually have the best starting point possible.
To achieve the best results, and to assure that the process will complete automatically and without hassle, the armature exploration needs to ideally explore like this (the program will always display the armature exploration with a warning log after execution):
	
		  o
		ooooo
		  o
		 ooo
		 o o
		 o o

As per the above, the main benefits of using URG! are that it'll take instantly care of determining and assigning the proper bones into the ragdoll hierarchy, of distributing weights and joints and finally it'll sort out balancing dampening and spring strenghts automatically, with the single press of a button.
Thanks to URG! versatility and reusability, you'll save countless precious hours and avoid many headaches across all of your projects, creating your ragdolls with a click.
The results are normally excellent, but if you're looking for a particular effect or behavior, you have access to all tweaking parameters, to change them and immediately create a new ragdoll to test.

USAGE
URG! is an editor script, and as such will run with your project in edit mode, exactly like all other similar editor addons.

- Start the program from Unity's menu bar:
	GAMEOBJECT=> CREATE OTHER=> ULTIMATE RAGDOLL...
- In editor mode, drag the object to ragdoll into URG!'s window slot
- press the CREATE RAGDOLL button. A console warning log message will indicate 	when the procedure is completed.
  NOTE: animation models (the ones that integrate "IK" bones and are not ideal for games) usually have a great number of bones useless to the game, which alter the exploration process. Whenever possible, demand to the 3d artist that IK bones be layered out of your game import, since in the worst cases those bones can lead to incorrect ragdoll resolution, and thus require drag and drop operations for proper ragdoll completion.
- After the ragdoll is created, it's possible to generate an interactive game object by simply adding one of the ragdoll classes available:
	- clsragdollify turns a regular game object into its ragdoll prefab
	- clskinetify turns a kinematic game object into a ragdoll
	- clsragollimbifier is the interface to clsurgent, a complete body part management class that needs be added to the gameobject in ragdoll creation phase, to be able to apply body part forces and create truly spectacular animations and ragdolls.
	NOTE: access each of these classes and the relative demo scene objects to find more information on how to use them

BASIC PARAMETERS

- Source slot: will hold the target object of the ragdoll creation process.
- Link slot: upon ragdoll creation, the source slot will be connected to the link slot. The operation makes a call to the clsurgutilities class.	Check out the class synopsis for more information
- Create ragdoll button: will find the source transform of the model, and will create the ragdoll.
- Connect ragdoll: will create a joint connection between any two bodies, adding components if necessary. Can be used to separatedly reagdoll two different game objects, and to link them afterwards.
	NOTE: if connecting to a ragdoll, be sure to be specifying the source bone in the link field, which can differ from the root.
- Clear all physics from root: will completely wipe out physics data from an object. Suggested before any ragdoll creation.
- Clear all physics from source: will remove physics data from source and all children.

OPTIONS
In the event that you wish to fine tune the ragdoll effect, you can click on the OPTIONS foldout to access the inner parameters of the application.

- Total mass: the weight in kilograms of the whole character. Weights are distributed along the body axes using proportion data from military tables (such proportions can not be altered by version 1.0 of the app.).
	The total mass value is very important since it directly affects the way Unity interacts with the character's body physics. An average 1.74 meter tall human weighs around 80kilograms, so you should proportionate your total mass value in respect to your characters' height and volume. 
- Physic material: the controller-specific material that will be added to each collider, to easily change the friction and bouncing behavior of the body parts from a single project element.
- Add entity scripts: will install a clsurgentactuator for each body part, and will install a clsurgent class in the source.root object, to create a centralized control reference for all collider and/ or trigger events to which the ragdolled body parts are subject. Disable this option if no ragdoll interaction is needed, and enable it to create ragdoll scripting, for example with kinetified game objects.
	NOTE: this is a preference option, and will be saved through sessions. 
- Fake limbs: this button will create the 'left' and 'right' gameobjects for the selected source, and the specified 'distance' lateral separation.
	These can be used for a number of purposes, but are designed to simplify linear ragdoll creation. Please refer to the tutorial videos in our youtube channel for step by step instructions.
- Kinematic ragdoll: will create rigidbodies with the 'iskinematic' parameter set to TRUE.
	NOTE: this is a preference option, and will be saved through sessions. 
- Rigidity: this parameter is used to calculate the fine tuning of the joint springs. Normally only noticeable when the character lands after a fall. Sensible float values range from 0 to 1.
- Maximum sub bones allowed: some models have decorative extremities or extra limbs that normally branch in several bones. Setting this parameter avoids their exploration so that those decorative extensions don't influence the ragdoll's physics.
- Exploration limit: this value represents the linear number of bones that URG! will navigate, departing from the root. When the value is 0 the exploration will try to proceed until the armature is fully explored, but if you have a very complex model (for example with fully rigged fingertips, antennae, tails,etc.) you will want to avoid accessing those parts to influence your ragdoll, since they'll most certainly add too much detail to automatically create a proper physical armature. In such a case, you can simply set this value to the number of bones you want URG! to explore from the root, which will automatically limit the exploration of the extremities.
- Body parts (head, arms, legs): a checked option will include the limb into the ragdoll creation process. For example, to create a left arm ragdoll only, uncheck head, right arm, left leg, right leg and spine.
- Preserve limb links to the root (Under the body parts foldout): if a limb's parent limb is excluded from the ragdoll, the limb will become disconnected from the model. Check this option to preserve the connection to the root, for all limbs that become unlinked in the body part selection process.
- Absorb shoulders: if the model has shoulders and they are narrower than the hips, the shoulders will be absorbed by the spine which will result in a heavier torso, and a more spectacular ragdoll
- Absorb tolerance: if a collider is this percentage smaller than its parent, it will be candidate for absorption, so as to achieve more dense colliders and eliminate jitter on small body parts.
- High, medium, low, minimum tension: these are body part specific parameters to describe how joints react when they bend. A value of 1 makes the relative joint part very unflexible, almost as if it weren't there. A value of 99 or higher transforms the joints into gelatin!
	High tension mainly affects the arms, low tension mainly affects the legs, and mid tension affects the whole body.
- Dampening and spring strength: these two parameters are auxilliary to the joints reactions and the rigidity. Values near 1 make the joints reaction 'kick in' sooner while higher values increase the reaction strength.
	Usually noticeable with long limbs and when the extremities dangle.
- Drag and Angular Drag: these two values represent the frequency at which the body parts movements will become dampened. A value of 0 represents absence of attrition, while a value of 100 will petrify the ragdoll in place almost immediately.
- Sampling matrix size: this is an auxilliary parameter that's used to sort the armature automatically. Unless your character has 30+ bones, there should be no need to alter this value. Of course the program will inform if there's the need to modify this value and retry the ragdoll creation, which fails if the value is too small.
- Bone vertical difference tolerance: in Unity units, this value represents the difference in height between two bones that will be considered in the same limb line (arms and legs), to determine where the extremities are located in respect to the root bone and the spine. This needs to be tweaked whenever the procedure fails to properly assign all the colliders to a limb line, for example if it misses to correctly identify the hands or feet, and add colliders to them, when they are aligned in the editor.
- Bone horizontal difference tolerance: same parameter as the vertical one, but related to the difference in lateral distance.
- Clear existing physics: when checked will wipe out the entire rigidbody and joints structure prior to creating the new ragdoll. URG! allows full reset, but be sure to unselect this checkbox if you want to maintain existing joints or colliders for some reason in your completed ragdoll.
- Automatically search for skinnedmeshrenderer: URG! relies on the root bone to properly auto assign the armature structure to the ragdoll. Said root bone can be manually indicated by dragging it from the object's armature in the hierarchy, or it can be searched by URG! by looking for the skinnedmeshrenderer component of the object. In the even that the model doesn't have the component and URG! fails to find the correct root bone, just drag the root bone manually into the object box and that will be enough to create the ragdoll.
	To identify the root bone in an object, drag the object into the scene and expand its hierarchy: you will notice that there's one transform which unfolds to show all the other transforms of the object, normally just one level under the parent.
- Verbose: when activated will show all of the application's activity. In the form of log messages. Mainly useful for determining how the program interprets the armature. Notice that it will instantly fill the log with per bone/per procedure analysis.
	
TROUBLESHOOTING
The program is built solidly but you might encounter problems in its usage.

Q- I receive such and such error trying to start URG! from the menu
A- Please assure that you're running the latest version of Unity. If your problems persist, please contact us from our site, http://unity.thearcgames.com or write an e-mail to unitysupport@thearcgames.com. We recommend the first method since emails can have all sorts of problems.

Q- I Pressed 'Create ragdoll' but nothing happens
A- Be sure to access your console window. Execution completion writes a warning message there.
	Additionally, open a scene window, be sure that you have an instance of your model in the hierarchy of the scene, and double click on it. This will automatically move the scene camera to your model. You will notice that it's now full of capsules and lines, meaning that the physical elements have been added.
	
Q- My ragdoll, or some parts of it disappear when the camera gets close
A- This is one documented behavior of Unity, regarding the SkinnedMeshRenderer component and the 'Update When Offscreen' attribute. Be sure that all parts of the game model that have the SkinnedMeshRenderer component have the 'Update When Offscreen' parameter checked.
	More information here 
	http://unity3d.com/support/documentation/Components/class-SkinnedMeshRenderer.html
	
Q- My ragdoll has some strange boxes at its feet, and looks like a microphone with arms sticking out
A- This happens because there's multiple meshes in the model, and URG! could not figure out which is the armature root. Expand the game model armature in the scene. Select the child of the armature that URG! initially found, drag it into URG!s source slot and create the ragdoll again.
			
Q- URG! hasn't properly ragdolled my model!
A- IF your model is not symmetrical and in T-POSE, chances are that its bones aren't well enough distributed. If you can't achieve better results by increasing the bone vertical difference parameter (refer to the options) it is likely that your model can't be properly ragdolled automatically with the other default parameters.
	Things to try:
	-	manually set the 'Exploration limit' value in the options. Try 1 as a starting value, which should be good enough for all rigged models. You can increase this value until you reach a reasonable limit in the armature exploration.
	-	manually t-pose the model. If you have an unfortunate model that's in some weird position, simply rotate its limbs into a T pose! This is somewhat a dirty trick, but it can work.
	-	reset your model's rotation. added rotation can influence exploration of the armature, so be sure that the caracter is not rotated from its original stance.
	In the case of other issues, please consider contacting us to explain the problem. We could even accomodate to try the model ourselves and see what's going on.
	
Q- The new ragdoll is behaving weirdly. Jumps around/ freaks out.
A- If the armature bones aren't properly designed (not connected or in a proper hierarchy) URG! might be unable to resolve the relationships between them. In such a case, consider using the companion ratman model as a reference, to properly set your model's armature.
	Do notice that by all means URG! does not look for a particularly designed armature, it just needs an armature that resembles the one in a human body, where all bones are connected and belong to a single structure.
	
CONTACTS
You can contact us for info and support through our site
http://unity.thearcgames.com
or by sending an e-mail to unitysupport@thearcgames.com

Our youtube channel:
http://www.youtube.com/user/TheArcGamesStudio?feature=mhee

Unity forums thread:
http://forum.unity3d.com/threads/107501-Release-URG!-The-ultimate-ragdoll-generator