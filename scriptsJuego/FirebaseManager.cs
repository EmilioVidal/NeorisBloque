using UnityEngine;
using UnityEngine.Networking;
using System.Collections; // Asegúrate de tener este using para IEnumerator
using System.Collections.Generic; // Asegúrate de tener este using para IEnumerator

using Firebase;
using Firebase.Database;

public class FirebaseManager : MonoBehaviour
{
    public string jsonFilePath = "Assets/StreamingAssets/google-services.json"; // Ruta al archivo JSON en tu proyecto

    void Start()
    {
        // Carga la configuración de Firebase desde el archivo JSON
        FirebaseApp.CheckAndFixDependenciesAsync().ContinueWith(task => {
            // Verifica si hay dependencias de Firebase resueltas correctamente
            FirebaseApp app = FirebaseApp.DefaultInstance; // Obtiene la instancia predeterminada de Firebase
            if (task.IsCompleted && !task.IsFaulted && app != null)
            {
                // Configura la URL de la base de datos de Firebase para el editor
                //app.SetDatabaseUrl("https://videojuego-fd243-default-rtdb.firebaseio.com");
                Debug.Log("Firebase initialized successfully");
            }
            else
            {
                // Maneja cualquier error en la inicialización de Firebase
                Debug.LogError("Firebase initialization failed: " + task.Exception);
            }
        });
    }

    public void SendDataToAPI(int totalCoins, float score, string userId)
    {
        StartCoroutine(PostDataToFirebase(totalCoins, score, userId));
    }

    public void UpdateCoinsAndScoreInFirebase(string userId, int totalCoins, float score)
    {
        StartCoroutine(PostDataToFirebase(totalCoins, score, userId));
    }

    IEnumerator PostDataToFirebase(int totalCoins, float score, string userId)
    {
        // Obtén una referencia al nodo del usuario en la base de datos de Firebase
        DatabaseReference userRef = FirebaseDatabase.DefaultInstance.GetReference("users").Child(userId);

        // Actualiza el número de monedas del usuario en la base de datos de Firebase
        var coinsTask = userRef.Child("coins").SetValueAsync(totalCoins);

        // Actualiza el puntaje del usuario en la base de datos de Firebase
        var scoreTask = userRef.Child("score").SetValueAsync(score);

        // Espera a que ambas operaciones de escritura se completen
        yield return new WaitUntil(() => coinsTask.IsCompleted && scoreTask.IsCompleted);

        if (coinsTask.Exception != null || scoreTask.Exception != null)
        {
            // Maneja cualquier error que ocurra durante la escritura
            Debug.LogError("Failed to update data in Firebase: " + coinsTask.Exception + " " + scoreTask.Exception);
        }
        else
        {
            Debug.Log("Data sent successfully");
        }
    }
}
