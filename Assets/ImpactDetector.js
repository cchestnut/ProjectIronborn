#pragma strict

function Start () {

}

function Update () {

}

function OnCollisionEnter (col : Collision)
{
	if(col.gameObject.name == "roBot"){
    	this.animation.Play("xhit_body");
    	Debug.Log("worked");
    } else {
    	Debug.Log(col.gameObject.name);
    }
}

function OnTriggerStay (other: Collider){
	var otherBot = other.gameObject;
	if(otherBot.name == "roBot" && otherBot.animation.IsPlaying("punch_hi_left")){
		this.animation.Play("xhit_body");
	} 
}