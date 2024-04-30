import React from 'react';
import Unity, { UnityContext } from "react-unity-webgl";
import { getDatabase } from "firebase/database"; // Asegúrate de importar getDatabase si no está hecho antes

// Suponiendo que ya has inicializado Firebase en otro archivo y lo estás importando aquí
import { database } from './firebase-config'; // Asegúrate de ajustar la ruta al archivo de configuración de Firebase

const unityContext = new UnityContext({
  loaderUrl: "Build/UnityLoader.js",
  dataUrl: "Build/data.data",
  frameworkUrl: "Build/framework.js",
  codeUrl: "Build/code.wasm",
});

const UnityGame = () => {
    // Función para manejar la actualización de monedas desde Unity
    window.updateUserDataFromUnity = (data) => {
      const { coins, userId } = data;
      const userRef = getDatabase().ref(`users/${userId}`);
      userRef.update({ coins })
        .then(() => console.log("Coins updated successfully"))
        .catch(error => console.error("Failed to update coins:", error));
    };
  
    return (
      <div>
        <Unity unityContext={unityContext} width="960" height="600" />
      </div>
    );
  };
  
  export default UnityGame;
