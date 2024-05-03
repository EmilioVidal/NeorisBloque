using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CustomizableAccessories : MonoBehaviour
{

    public int accessoryNr;

    public Accessories[] accessories;
    SpriteRenderer spriteRenderer;
    SpriteRenderer parentSpriteRenderer;
    CustomizableCharacter customizableCharacter;
    public Text priceText1;
    public GameObject buyButton1;

    void Start()
    {
        spriteRenderer = GetComponent<SpriteRenderer>();
        parentSpriteRenderer = GetComponentInParent<SpriteRenderer>();
        customizableCharacter = GetComponentInParent<CustomizableCharacter>();
        LoadPlayerProgress(); // Cargar el progreso del jugador al iniciar
        CheckUnlockedAccesory(); // Verificar si la skin actual está desbloqueada
        UpdateUI();
    }

    void CheckUnlockedAccesory()
    {
        if (!IsAccesoryUnlocked(accessoryNr))
        {
            // Si la skin actual no está desbloqueada, buscar la primera skin desbloqueada
            for (int i = 0; i < accessories.Length; i++)
            {
                if (IsAccesoryUnlocked(i))
                {
                    accessoryNr = i;
                    break;
                }
            }
        }
    }

    bool IsAccesoryUnlocked(int accesoryIndex)
    {
        return PlayerPrefs.GetInt("AccesoryUnlocked_" + accesoryIndex, 0) == 1;
    }

    void LateUpdate()
    {
        AccessoryChoice();
    }

    void AccessoryChoice(){
        spriteRenderer.sprite = accessories[accessoryNr].sprites[customizableCharacter.spriteNr];
    }

    // UI Element - Link to a button to select the next skin
    public void AccessoryPlus(){
        accessoryNr++;
        if (accessoryNr >= accessories.Length)
            accessoryNr = 0;
        SavePlayerProgress(); // Guardar el progreso del jugador después de cambiar la skin
        UpdateUI();
    }

    // UI Element - Link to a button to select the previous skin
    public void AccessoryMin(){
        accessoryNr--;
        if (accessoryNr < 0)
            accessoryNr = accessories.Length - 1;
        SavePlayerProgress(); // Guardar el progreso del jugador después de cambiar la skin
        UpdateUI();
    }

    public void BuySkin()
    {
        int price = accessories[accessoryNr].accesoryPrice;
        int coins = PlayerPrefs.GetInt("NumberOfCoins", 0);
        if (coins >= price)
        {
            coins -= price;
            PlayerPrefs.SetInt("NumberOfCoins", coins);
            PlayerPrefs.SetInt("AccesoryUnlocked_" + accessoryNr, 1);
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
        accessoryNr = PlayerPrefs.GetInt("CurrentAccessory", 0);
    }

    void SavePlayerProgress()
    {
        PlayerPrefs.SetInt("CurrentAccessory", accessoryNr);
    }

    void UpdateUI()
    {
        int coins = PlayerPrefs.GetInt("NumberOfCoins", 0);
        if (accessories.Length == 0)
        {
            priceText1.text = "Price: N/A";
            buyButton1.SetActive(false);
            return;
        }
        int price = accessories[accessoryNr].accesoryPrice;
        priceText1.text = "Price: " + price.ToString();
        if (PlayerPrefs.GetInt("AccesoryUnlocked_" + accessoryNr, 0) == 1)
        {
            buyButton1.SetActive(false);
        }
        else
        {
            buyButton1.SetActive(true);
            buyButton1.GetComponent<Button>().interactable = (coins >= price);
        }
    }
}


[System.Serializable]
public struct Accessories{
    public Sprite[] sprites;
    public int accesoryPrice;
}