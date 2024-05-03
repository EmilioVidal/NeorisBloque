using UnityEngine;
using TMPro;
using Firebase.Database;
using UnityEngine.Networking;
using System.Collections;

public class DistanceScoreScript : MonoBehaviour
{
    public GameObject startPos;
    public TextMeshProUGUI scoreText;
    public TextMeshProUGUI highScoreText;
    private float distance;
    public static float highScore;    
    private int coins;

    // La clave para guardar el puntaje máximo en PlayerPrefs
    private const string HighScoreKey = "HighScore";

    // Referencia al FirebaseManager
    public FirebaseManager firebaseManager;

    void Start()
    {
        // Obtén el puntaje máximo guardado (si existe)
        highScore = PlayerPrefs.GetFloat(HighScoreKey, 0f);

        // Actualiza el texto del puntaje máximo
        highScoreText.text = "Best: " + highScore.ToString("F1") + "M";
    }

    void Update()
    {
        // Calcula la distancia actual
        distance = Mathf.Abs(startPos.transform.position.x - this.transform.position.x);

        // Actualiza el texto del puntaje actual
        scoreText.text = "Current: " + distance.ToString("F1") + "M";

        // Si la distancia actual es mayor que el puntaje máximo, actualiza el puntaje máximo y guárdalo
        if (distance > highScore)
        {
            highScore = distance;
            PlayerPrefs.SetFloat(HighScoreKey, highScore);
            highScoreText.text = "Best: " + highScore.ToString("F1") + "M";
        }

        // Llama al método de FirebaseManager para enviar datos a Firebase
        firebaseManager.UpdateCoinsAndScoreInFirebase("user-id", coins, distance);
    }
}