#pragma strict

var health = 15;
var impact = 0;
var endAnimation;
var attackString = "punch_hi_left";
function Start () {

}

function Update () {

}

function OnTriggerStay (other: Collider){
	var otherBot = other.gameObject;
	if(otherBot.name == "roBot" && otherBot.animation.IsPlaying(attackString)){
		//Debug.Log(otherBot.animation.GetClipCount());
		if(isPostAnimation(otherBot.animation[attackString])){
			gotHit();
		}
	} 
}

function ReceiveMyoAcc(damage: int) {
	impact = damage;
}

function ReceiveAttackString(att : String){
	attackString = att;
}

function gotHit(){
	
	//animate once after certain time
		if(impact != null){
			health -= impact;
		}
	if(health > 0){
		//find out damage
		this.animation.Play("xhit_body");
	} else if (this.gameObject.tag == "Player"){
		//this.camera.
	}
	else {
		//death animate
		Debug.Log(health);
		this.animation.Play("final_head");
		this.rigidbody.useGravity = true;
	}	
}

function isPostAnimation(anima: AnimationState){
	return anima.time >= (anima.length - .01);
}