using UnityEngine;
using System.Collections;
public class PlayerCollision : MonoBehaviour
{
    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.transform.tag == "Enemy")
        {
                PlayerManager.isGameOver = true;
        }
    }
}