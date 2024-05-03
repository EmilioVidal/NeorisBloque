using UnityEngine;

public class GrapplerObject : MonoBehaviour
{
    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            // Retrieve PlayerMovement component from the player
            PlayerMovement playerMovement = other.GetComponent<PlayerMovement>();

            if (playerMovement != null)
            {
                // Grant double jump skill
                playerMovement.hasGrappler = false;

                // Save the double jump skill state
                PlayerPrefs.SetInt("HasGrappler", 0);
                PlayerPrefs.Save();

                // Destroy this object after granting the skill
                Destroy(gameObject);
            }
        }
    }
}
