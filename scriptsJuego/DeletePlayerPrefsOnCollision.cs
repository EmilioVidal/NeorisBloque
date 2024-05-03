using UnityEngine;

public class DeletePlayerPrefsOnCollision : MonoBehaviour
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
                Debug.Log("Player collided with object, deleting player prefs...");
                PlayerPrefs.DeleteAll();
                Debug.Log("Player prefs deleted.");

                // Destroy this object after granting the skill
                Destroy(gameObject);
            }
        }
    }
}
