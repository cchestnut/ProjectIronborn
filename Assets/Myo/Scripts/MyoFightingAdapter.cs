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

		if (thalmicMyo.isPaired) {
			thalmicMyo.Vibrate(Thalmic.Myo.VibrationType.Short);
		}
		Debug.Log (thalmicMyo);
		Debug.Log (myo);
	}


	
	// Update is called once per frame
	void Update () {
		hub = ThalmicHub.instance;

		if(thalmicMyo != null && thalmicMyo.pose.ToString() == "Fist"){
			if(player == null){
				player = GameObject.FindGameObjectWithTag("Player");
			}
				player.animation.Play("punch_hi_left");
		}
				
		if (Input.GetKeyDown ("q")) {
			hub.ResetHub();
		}
	}
}
