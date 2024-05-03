using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CustomizableCharacter : MonoBehaviour
{
    public int skinNr;
    public Skins[] skins;
    SpriteRenderer spriteRenderer;
    public int spriteNr;
    public Text priceText;
    public GameObject buyButton;


    void Start()
    {
        spriteRenderer = GetComponent<SpriteRenderer>();
        LoadPlayerProgress(); // Cargar el progreso del jugador al iniciar
        CheckUnlockedSkin(); // Verificar si la skin actual está desbloqueada
        UpdateUI();
    }

    void CheckUnlockedSkin()
    {
        if (!IsSkinUnlocked(skinNr))
        {
            // Si la skin actual no está desbloqueada, buscar la primera skin desbloqueada
            for (int i = 0; i < skins.Length; i++)
            {
                if (IsSkinUnlocked(i))
                {
                    skinNr = i;
                    break;
                }
            }
        }
    }

    bool IsSkinUnlocked(int skinIndex)
    {
        return PlayerPrefs.GetInt("SkinUnlocked_" + skinIndex, 0) == 1;
    }


    void LateUpdate()
    {
        SkinChoice();
    }

    void SkinChoice()
    {
        if (spriteRenderer.sprite.name.Contains("baseGoat"))
        {
            string spriteName = spriteRenderer.sprite.name;
            spriteName = spriteName.Replace("baseGoat_", "");
            spriteNr = int.Parse(spriteName);

            spriteRenderer.sprite = skins[skinNr].sprites[spriteNr];
        }
    }

    public void SkinPlus()
    {
        skinNr++;
        if (skinNr >= skins.Length)
            skinNr = 0;
        SavePlayerProgress(); // Guardar el progreso del jugador después de cambiar la skin
        UpdateUI();
    }

    public void SkinMin()
    {
        skinNr--;
        if (skinNr < 0)
            skinNr = skins.Length - 1;
        SavePlayerProgress(); // Guardar el progreso del jugador después de cambiar la skin
        UpdateUI();
    }

    public void BuySkin()
    {
        int price = skins[skinNr].skinPrice;
        int coins = PlayerPrefs.GetInt("NumberOfCoins", 0);
        if (coins >= price)
        {
            coins -= price;
            PlayerPrefs.SetInt("NumberOfCoins", coins);
            PlayerPrefs.SetInt("SkinUnlocked_" + skinNr, 1);
            SavePlayerProgress(); // Guardar el progreso del jugador después de comprar la skin
            UpdateUI();
        }
        else
        {
            Debug.Log("No tienes suficientes monedas para comprar esta skin.");
        }
    }

    void LoadPlayerProgress()
    {
        skinNr = PlayerPrefs.GetInt("CurrentSkin", 0);
    }

    void SavePlayerProgress()
    {
        PlayerPrefs.SetInt("CurrentSkin", skinNr);
    }

    void UpdateUI()
    {
        int coins = PlayerPrefs.GetInt("NumberOfCoins", 0);
        if (skins.Length == 0)
        {
            priceText.text = "Price: N/A";
            buyButton.SetActive(false);
            return;
        }
        int price = skins[skinNr].skinPrice;
        priceText.text = "Price: " + price.ToString();
        if (PlayerPrefs.GetInt("SkinUnlocked_" + skinNr, 0) == 1)
        {
            buyButton.SetActive(false);
        }
        else
        {
            buyButton.SetActive(true);
            buyButton.GetComponent<Button>().interactable = (coins >= price);
        }
    }
}

[System.Serializable]
public struct Skins
{
    public Sprite[] sprites;
    public int skinPrice;
}
