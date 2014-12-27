#pragma strict

function Start () {

}

function Update () {
	var inputKey = Input.inputString;
	if (inputKey == 'x'){
		animation.Play("punch_hi_left");
	}
}

function OnCollisionEnter (){
}