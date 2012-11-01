var speed = 3.0;
var rotationSpeed = 5.0;
var shootRange = 15.0;
var attackRange = 30.0;
var shootAngle = 4.0;
var dontComeCloserRange = 5.0;
var delayShootTime = 0.35;
var pickNextWaypointDistance = 2.0;
static var target : Transform;
var frisbee : Transform;

private var lastShot = -10.0;

// Make sure there is always a character controller
@script RequireComponent (CharacterController)

function Start () {
	// Auto setup player as target through tags
	Patrol();
}

function Patrol () {
	var curWayPoint = autoWayPoint.FindClosest(transform.position);
	while (true) {
		var waypointPosition = curWayPoint.transform.position;
		// Are we close to a waypoint? -> pick the next one!
		if (Vector3.Distance(waypointPosition, transform.position) < pickNextWaypointDistance)
			curWayPoint = PickNextWaypoint (curWayPoint);

		// Attack the player and wait until
		// - player is killed
		// - player is out of sight		
		if (CanSeeTarget())
			yield StartCoroutine("AttackPlayer");
		if (canSeeVehicle())
			yield StartCoroutine("attackVehicle");
		
		// Move towards our target
		MoveTowards(waypointPosition);
		
		yield;
	}
}


function CanSeeTarget () : boolean {
	if (Vector3.Distance(transform.position, target.position) > attackRange)
		return false;
		
	var hit : RaycastHit;
	if (Physics.Linecast (transform.position, target.position, hit))
		return hit.transform == target;

	return false;
}

function canSeeVehicle() : boolean {
	if (Vector3.Distance(transform.position, target.position) > attackRange)
		return false;
		
	var hit : RaycastHit;
	if (Physics.Linecast (transform.position, target.position, hit))
		return hit.transform == target.Find("Controller").GetComponent(manageWeaponFiring).vehicle;

	return false;
}

function Shoot () {
	// Start shoot animation
	animation.CrossFade("shoot", 0.3);

	// Wait until half the animation has played
	yield WaitForSeconds(delayShootTime);
	
	// Fire frisbee
	var f : Transform = Instantiate(frisbee,transform.position + transform.forward * frisbee.GetComponent(frisbeeMotion).getRadius(),transform.rotation); //here you can rotate 2x the angle downhill or just look at the player
	frisbee.rigidbody.velocity = GetComponent(CharacterController).velocity;
	frisbee.GetComponent(frisbeeMotion).shooter = transform;
	
	// Wait for the rest of the animation to finish
	yield WaitForSeconds(animation["shoot"].length - delayShootTime);
}

//choose anti-vehicle weapon

function attackVehicle() {
	var v : Transform = target.Find("Controller").GetComponent(manageWeaponFiring).vehicle;
	var lastVisiblePlayerPosition = target.position;
	var counter:int = 0;
	var decision:float;
	while (true) {
		if (canSeeVehicle()) {
			// Target is dead - stop hunting
			if (v == null ||  (v.GetComponent(vehicle) && ! v.GetComponent(vehicle).health.isAlive()) || (v.GetComponent(Store) && ! v.GetComponent(Store).health.isAlive()) || ! v.GetComponent(vehicle).isOccupied)
				return;
			// Target is too far away - give up	
			var distance = Vector3.Distance(transform.position, v.position);
			//if (distance > shootRange * 3)
			//	return;
			
			lastVisiblePlayerPosition = v.position;
			if (distance > dontComeCloserRange)
				MoveTowards (lastVisiblePlayerPosition);
			else
				RotateTowards(lastVisiblePlayerPosition);

			var forward = transform.TransformDirection(Vector3.forward);
			var targetDirection = lastVisiblePlayerPosition - transform.position;
			targetDirection.y = 0;

			var angle = Vector3.Angle(targetDirection, forward);
			
			if(counter<1){
				decision = Random.Range(0.0,2.0);
			}
			//strafe(decision);
			if(counter >10){
				counter = -1;
			}
			// Start shooting if close and play is in sight
			if (distance < shootRange && angle < shootAngle)
				yield StartCoroutine("Shoot");
			counter++;
		}
		else {
			yield StartCoroutine("SearchPlayer", lastVisiblePlayerPosition);
			// Player not visible anymore - stop attacking
			if (!CanSeeTarget ())
				return;
		}

		yield;
	}
}

function AttackPlayer() {
	var lastVisiblePlayerPosition = target.position;
	var counter:int = 0;
	var decision:float;
	while (true) {
		if (CanSeeTarget()) {
			// Target is dead - stop hunting
			if (target == null || ! target.GetComponent(healthManager).isAlive())
				return;
			// Target is too far away - give up	
			var distance = Vector3.Distance(transform.position, target.position);
			//if (distance > shootRange * 3)
			//	return;
			
			lastVisiblePlayerPosition = target.position;
			if (distance > dontComeCloserRange)
				MoveTowards (lastVisiblePlayerPosition);
			else
				RotateTowards(lastVisiblePlayerPosition);

			var forward = transform.TransformDirection(Vector3.forward);
			var targetDirection = lastVisiblePlayerPosition - transform.position;
			targetDirection.y = 0;

			var angle = Vector3.Angle(targetDirection, forward);
			
			if(counter<1){
				decision = Random.Range(0.0,2.0);
			}
			//strafe(decision);
			if(counter >10){
				counter = -1;
			}
			// Start shooting if close and play is in sight
			if (distance < shootRange && angle < shootAngle)
				yield StartCoroutine("Shoot");
			counter++;
		} else {
			//yield StartCoroutine("SearchPlayer", lastVisiblePlayerPosition);
			// Player not visible anymore - stop attacking
			if (!CanSeeTarget ())
				return;
		}

		yield;
	}
}

function SearchPlayer (position : Vector3) {
	// Run towards the player but after 3 seconds timeout and go back to Patroling
	var timeout = 3.0;
	while (timeout > 0.0) {
		MoveTowards(position);

		// We found the player
		if (CanSeeTarget ())
			return;

		timeout -= Time.deltaTime;
		yield;
	}
}

function RotateTowards (position : Vector3) {
	SendMessage("SetSpeed", 0.0);
	
	var direction = position - transform.position;
	direction.y = 0;
	if (direction.magnitude < 0.1)
		return;
	
	// Rotate towards the target
	transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
	transform.eulerAngles = Vector3(0, transform.eulerAngles.y, 0);
}

function MoveTowards (position : Vector3) {
	var direction = position - transform.position;
	direction.y = 0;
	if (direction.magnitude < 0.5) {
		SendMessage("SetSpeed", 0.0);
		return;
	}
	
	// Rotate towards the target
	transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
	transform.eulerAngles = Vector3(0, transform.eulerAngles.y, 0);

	// Modify speed so we slow down when we are not facing the target
	var forward = transform.TransformDirection(Vector3.forward);
	var speedModifier = Vector3.Dot(forward, direction.normalized);
	speedModifier = Mathf.Clamp01(speedModifier);

	// Move the character
	direction = forward * speed * speedModifier;
//	print(direction);
	GetComponent (CharacterController).SimpleMove(direction);
	GetComponent (CharacterController).SimpleMove(Vector3.right);
	
	SendMessage("SetSpeed", speed * speedModifier, SendMessageOptions.DontRequireReceiver);
}

function PickNextWaypoint (currentWaypoint : autoWayPoint) {
	// We want to find the waypoint where the character has to turn the least

	// The direction in which we are walking
	var forward = transform.TransformDirection(Vector3.forward);

	// The closer two vectors, the larger the dot product will be.
	var best = currentWaypoint;
	var bestDot = -10.0;
	for (var cur : autoWayPoint in currentWaypoint.connected) {
		var direction = Vector3.Normalize(cur.transform.position - transform.position);
		var dot = Vector3.Dot(direction, forward);
		if (dot > bestDot && cur != currentWaypoint) {
			bestDot = dot;
			best = cur;
		}
	}
	
	return best;
}

function strafe(choice:float){
	var right = Vector3.right;
	var left = Vector3.left;
	var direction;
	if(choice<=1){
		direction = right;
		print("right");
	}
	else{
		direction = left;
		print("left");
	}
	
	GetComponent(CharacterController).SimpleMove(Vector3.right/200000);
	
}