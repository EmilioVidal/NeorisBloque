// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { signInWithEmailAndPassword } from "firebase/auth"; // Importa signInWithEmailAndPassword también
import { format } from 'date-fns';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyCkFeWzUjvXZCes0LgTvjMHc07F80pzk",
  authDomain: "videojuego-fd243.firebaseapp.com",
  projectId: "videojuego-fd243",
  storageBucket: "videojuego-fd243.appspot.com",
  messagingSenderId: "951943583016",
  appId: "1:951943583016:web:d6d14e1148ca8ec88f6c1d",
  measurementId: "G-R02D8PBHGB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const analytics = getAnalytics(app);
export const storage = getStorage(app); // Esto está bien, exporta storage directamente aquí

setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log('Persistencia de sesión establecida');
    })
    .catch((error) => {
        console.error('Error al establecer la presistencia de sesion:', error);
    });

// Simplemente exporta los demás que no han sido exportados directamente
export { auth, database, analytics, signInWithEmailAndPassword }; // Asegúrate de exportar signInWithEmailAndPassword
