#pragma strict
var speed : float = 1.0;
	var jumpSpeed : float = 8.0;
	var gravity : float = 20.0;
	var moveDirection : Vector3 = Vector3.zero;
	private var playerController : CharacterMotor;
	var player : GameObject;
	//var transform : Transform;
	
function Start () {
	player = GameObject.FindGameObjectWithTag("Player");	
	//transform = this.transform;
}

function Awake(){
	playerController = GetComponent("CharacterMotor");
}

function Update () {

}

function PerformMovement(isForwards){
	//if (playerController.isGrounded) {
		// We are grounded, so recalculate
		// move direction directly from axes
		moveDirection = new Vector3(Input.GetAxis("Horizontal"), 0,
		                      Input.GetAxis("Vertical"));
		
		moveDirection = player.transform.TransformDirection(-Vector3.forward);
		moveDirection *= speed;
		if (Input.GetButton ("Jump")) {
			moveDirection.y = jumpSpeed;
		}
	//}
	// Apply gravity
	moveDirection.y -= gravity * Time.deltaTime;
	if(!isForwards) moveDirection *= -1;
	player.SendMessage("SetDirection", moveDirection);
	//if(!isForwards){ moveDirection.x *= -1;
	// Apply the direction to the CharacterMotor
	//playerController.Move(moveDirection * Time.deltaTime);
	
}