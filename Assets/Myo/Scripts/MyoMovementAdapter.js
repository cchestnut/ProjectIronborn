#pragma strict
var speed : float = 0.01;
	var jumpSpeed : float = 8.0;
	var gravity : float = 20.0;
	var moveDirection : Vector3 = Vector3.zero;
	var playerController : CharacterMotor;
	var control : CharacterController;
	var player : GameObject;
	var playerCam : GameObject;
	//var transform : Transform;
	
function Start () {
	player = GameObject.FindGameObjectWithTag("Player");
	playerController = player.GetComponent("CharacterMotor");	
	control = player.GetComponent("CharacterController");
	//transform = this.transform;
}

function Awake(){
	//playerController = GetComponent("CharacterMotor");
}

function Update () {

}

function PerformMovement(isForwards){
	//layerController
	
	//if (playerController.isGrounded) {
		// We are grounded, so recalculate
		// move direction directly from axes
		//if (isForwards == null) return;
		moveDirection = new Vector3(Input.GetAxis("Horizontal"), 0,
		                      Input.GetAxis("Vertical"));
		//moveDirection = Camera.main.transform.forward;
		//var dir = Camera.main.transform.forward;
		//var rot = player.transform.rotation;
		moveDirection 
			= player.transform.TransformDirection(Vector3.forward);
		moveDirection *= speed;
		if (Input.GetButton ("Jump")) {
			moveDirection.y = jumpSpeed;
		}
	//}
	// Apply gravity
	//moveDirection.y -= gravity * Time.deltaTime;
	if(!isForwards) moveDirection *= -1;
	control.Move(moveDirection);
	//player.SendMessage("SetDirection", moveDirection);
	
	//if(!isForwards){ moveDirection.x *= -1;
	// Apply the direction to the CharacterMotor
	//playerController.Move(moveDirection * Time.deltaTime);
	
}