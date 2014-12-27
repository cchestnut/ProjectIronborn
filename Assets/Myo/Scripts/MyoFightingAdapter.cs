using UnityEngine;
using System.Collections;

// Check to see if a Myo armband is paired.
public class MyoFightingAdapter : MonoBehaviour
{
	// Myo game object to connect with.
	// This object must have a ThalmicMyo script attached.
	public GameObject myo;
	

	ThalmicHub hub;
	ThalmicMyo thalmicMyo;
	//private InputMapping;
	// Use this for initialization
	void Start () {
		hub = ThalmicHub.instance;
		myo = GameObject.FindGameObjectWithTag("Player");
		// Access the ThalmicMyo script attached to the Myo object.
		thalmicMyo = myo.GetComponent<ThalmicMyo> ();

		if (thalmicMyo.isPaired) {
			thalmicMyo.Vibrate(Thalmic.Myo.VibrationType.Short);
		}

	}


	
	// Update is called once per frame
	void Update () {
		if(thalmicMyo.pose.ToString() == "fist"){
			animation.Play("punch_hi_left");
		}
	}
}
