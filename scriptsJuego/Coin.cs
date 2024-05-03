using UnityEngine;
using Firebase;
using Firebase.Database;
using SimpleJSON;
using System.Collections;
using UnityEngine.Networking;


public class Coin : MonoBehaviour
{
    DatabaseReference dbRef;

    void Start()
    {
        dbRef = FirebaseDatabase.DefaultInstance.RootReference;
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.transform.tag == "Player")
        {
            PlayerManager.numberOfCoins++;
            PlayerPrefs.SetInt("NumberOfCoins", PlayerManager.numberOfCoins);

            // Obtener el ID de usuario de alguna manera
            string userId = "users"; // Reemplaza "user-id" con el ID de usuario real

            // Actualizar Firebase
FindObjectOfType<FirebaseManager>().UpdateCoinsAndScoreInFirebase(userId, PlayerManager.numberOfCoins, DistanceScoreScript.highScore);        }
    }
}