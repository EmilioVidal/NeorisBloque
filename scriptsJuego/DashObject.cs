using UnityEngine;

public class DashObject : MonoBehaviour
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
                playerMovement.canDash = true;

                // Save the double jump skill state
                PlayerPrefs.SetInt("CanDash", 1);
                PlayerPrefs.Save();

                // Destroy this object after granting the skill
                Destroy(gameObject);
            }
        }
    }
}
