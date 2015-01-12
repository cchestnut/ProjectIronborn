using UnityEngine;
using System.Collections;
using Thalmic.Myo;

// Check to see if a Myo armband is paired.
public class MyoFightingAdapter : MonoBehaviour
{
	// Myo game object to connect with.
	// This object must have a ThalmicMyo script attached.
	public GameObject myo;


	ThalmicHub hub;
	ThalmicMyo thalmicMyo;
	GameObject player;
	GameObject enemy;
	bool canMove = true;
	bool hasConnected = false;
	//private InputMapping;
	// Use this for initialization
	void Start () {
		hub = ThalmicHub.instance;
		//myo = GameObject.FindGameObjectWithTag("Player");
		if (myo == null) {
			myo = this.gameObject;		
		}

		// Access the ThalmicMyo script attached to the Myo object.
		thalmicMyo = myo.GetComponent<ThalmicMyo> ();
		player = GameObject.FindGameObjectWithTag("Player");

		if (thalmicMyo.isPaired) {
			thalmicMyo.Vibrate(Thalmic.Myo.VibrationType.Short);
		}
	}


	
	// Update is called once per frame
	void Update () {
		hub = ThalmicHub.instance;
		if (!hasConnected && thalmicMyo && thalmicMyo.isPaired) {
			thalmicMyo.Vibrate(Thalmic.Myo.VibrationType.Short);
			hasConnected = true;
		}
		if (thalmicMyo == null)
			return;
		if (thalmicMyo.pose.ToString () == "Fist" && thalmicMyo.accelerometer.x > .5) {
			canMove = false;
			attack ("Basic");
		} else if (canMove && thalmicMyo.pose.ToString() == "WaveOut") {
			if(thalmicMyo.gyroscope.magnitude > 30){
				bool dir = true;
				player.SendMessage("PerformMovement", dir);
			}
			else if(thalmicMyo.gyroscope.magnitude < 10){
				bool dir = false;
				player.SendMessage("PerformMovement", dir);
			}
		} else if (thalmicMyo.pose.ToString() == "FingersSpread"){
			canMove = true;
		}
				
		if (Input.GetKeyDown ("q")) {
			hub.ResetHub();
		}
	}

	void setCanMove(bool val){
		canMove = val;
	}
	void attack(string attackType){
		if (attackType.CompareTo ("Basic") == 0) {
			if(player == null){
				player = GameObject.FindGameObjectWithTag("Player");
			}
			if(enemy == null){
				enemy = GameObject.FindGameObjectWithTag("Enemy");
			}
			player.SendMessage("Punch");
			enemy.SendMessage("ReceiveMyoAcc", 5);
		}
	}
}
