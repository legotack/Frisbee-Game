static var waypoints = Array();
var connected = Array();
static var kLineOfSightCapsuleRadius = 0.25;

var hideCube : boolean;

function Update() {
	if (hideCube)
		GetComponent(MeshRenderer).enabled = false;
}

static function FindClosest (pos : Vector3) : autoWayPoint {
	// The closer two vectors, the larger the dot product will be.
	var closest : autoWayPoint;
	var closestDistance = 100000.0;
	for (var cur : autoWayPoint in waypoints) {
		var distance = Vector3.Distance(cur.transform.position, pos);
		if (distance < closestDistance)
		{
			closestDistance = distance;
			closest = cur;
		}
	}

	return closest;
}

@ContextMenu ("Update Waypoints")
function UpdateWaypoints () {
	RebuildWaypointList();
}

function Awake () {
	RebuildWaypointList();
}


// Draw the waypoint pickable gizmo
function OnDrawGizmos () {
	Gizmos.DrawIcon (transform.position, "Waypoint.tif");
}

// Draw the waypoint lines only when you select one of the waypoints
function OnDrawGizmosSelected () {
	if (waypoints.length == 0)
		RebuildWaypointList();
	for (var p : autoWayPoint in connected) {
		if (Physics.Linecast(transform.position, p.transform.position)) {
			Gizmos.color = Color.red;
			Gizmos.DrawLine (transform.position, p.transform.position);
		} else {
			Gizmos.color = Color.green;
			Gizmos.DrawLine (transform.position, p.transform.position);
		}
	}
}

function RebuildWaypointList () {
	var objects : Object[] = FindObjectsOfType(autoWayPoint);
	waypoints = Array(objects);
	
	for (var point : autoWayPoint in waypoints) {
		point.RecalculateConnectedWaypoints();
	}
}

function RecalculateConnectedWaypoints ()
{
	connected = Array();

	for (var other : autoWayPoint in waypoints) {
		// Don't connect to ourselves
		if (other == this)
			continue;
		
		// Do we have a clear line of sight?
		if (!Physics.CheckCapsule(transform.position, other.transform.position, kLineOfSightCapsuleRadius)) {
			connected.Add(other);
		}
	}	
}