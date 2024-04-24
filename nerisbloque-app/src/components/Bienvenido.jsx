import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Bienvenido.css';
import Footer from "../components/Footer";
import noerisLogo from '../img/NEORIS logo dark.png';
import { auth } from './FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Bienvenido() {
    const navigate = useNavigate();
  
    const handleLogin = async (event) => {
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;
  
      try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log("Inicio de sesión exitoso:", userCredential);
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
          <form onSubmit={handleLogin}> {/* Añade esto */}
            <div className='input'>
                <div>
                    <p>Email</p>
                    <input type="text" name="email" /> {/* Añade name="email" */}
                </div>
                <div>
                    <p>Contraseña</p>
                    <input type="password" name="password" /> {/* Añade name="password" */}
                </div>
            </div>
            <button type="submit" className='inicialS'>Iniciar sesión</button> {/* Cambia Link por button */}
          </form>
          <div id='post-login'>
            <label>
              <input type="checkbox"/> Recuérdame
            </label>
            <a href="">Olvide mi contraseña</a>
          </div>
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
