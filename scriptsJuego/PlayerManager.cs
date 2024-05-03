using UnityEngine.SceneManagement;
using UnityEngine;
using TMPro;

public class PlayerManager : MonoBehaviour
{
    public static bool isGameOver;
    public static bool isLevelOver;
    public GameObject gameOverScreen;
    public GameObject ENDLEVELPANEL;

    public static int numberOfCoins;
    public TextMeshProUGUI coinsText;


    private void Awake()
    {
        isGameOver = false;
        isLevelOver = false;
        numberOfCoins = PlayerPrefs.GetInt("NumberOfCoins", 0);

    }

    void Update()
    {
        coinsText.text = "NEOCOINS: "  + numberOfCoins.ToString();
        if (isGameOver)
        {
            gameOverScreen.SetActive(true);
        }
        if (isLevelOver)
        {
            ENDLEVELPANEL.SetActive(true);
        }
    }



    public void ReplayLevel()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }

    public void LoadLevel(int index)
    {
        SceneManager.LoadScene(index);
    }

}