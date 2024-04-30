import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Bienvenido.css';
import Footer from "../components/Footer";
import noerisLogo from '../img/NEORIS logo dark.png';
import { auth } from '../API/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Bienvenido({setEmail, user}) {
    const navigate = useNavigate();
    //const [loggedIn, setLoggedIn] = useState(false); // Estado para controlar si el usuario está autenticado paa el Log Iin


    const handleLogin = async (event) => {
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;
  
      try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log("Inicio de sesión exitoso:", userCredential);
          setEmail(email);  
          console.log(email) 
          console.log("pepe",user)      

              //aqui es donde se piden los datos del usuario en la base de datos
          //despues hacer un set user donde mande los datos del usuario 
          navigate("/game"); // Aquí utilizamos navigate para redirigir al usuario
      } catch (error) {
          console.error("Error en el inicio de sesión:", error);
          switch (error.code) {
            case 'auth/user-not-found':
              alert("No existe una cuenta con este correo electrónico.");
              break;
            case 'auth/wrong-password':
              alert("Contraseña incorrecta.");
              break;
            default:
              alert("Error en el inicio de sesión: " + error.message);
          }
      }
    };
  
    return (
      // El código restante de tu componente
      <div id='loginP'>
          <div  id='Nlogo'>
              <img src={noerisLogo} alt="" />
          </div>
        <h2>Bienvenido</h2>
          <form onSubmit={handleLogin}> {}
            <div className='input'>
                <div>
                    <p>Email</p>
                    <input type="text" name="email" /> {/* Añade name="email" */}
                </div>
                <div>
                    <p>Contraseña</p>
                    <input type="password" name="password" /> {/* Añade name="password" */}
                </div>
                <button type="submit" className='inicialS' style={{cursor:"pointer"}}>Iniciar sesión</button> {/* Cambia Link por button */}
            </div>
          </form>
          <div id='lineaS'>
              <div className='linea-horizontal'></div>
              <span>ó</span>
              <div className='linea-horizontal'></div>
          </div>
          <Link to="/adminLog" className='AdminB'>Administrador</Link>
          <footer>
              <Footer />
          </footer>
      </div>
    )
  }
  

export default Bienvenido;
