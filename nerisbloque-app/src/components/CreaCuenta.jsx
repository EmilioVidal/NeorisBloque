import React from 'react';
import { Link } from 'react-router-dom';
import './Bienvenido.css';
import { auth, database } from '../API/FirebaseConfig';
// import { database } from ' ./FirebaseConf
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

function CreaCuenta() {
  const handleRegister = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar el email en la base de datos
      set(ref(database, 'users/' + user.uid), {
        email: email,
      });

      console.log("Usuario creado y guardado en la base de datos");
      // Redirigir al usuario o mostrar un mensaje de éxito
    } catch (error) {
      console.error("Error al registrar el usuario:", error.message);
      alert(error.message);
    }
  };

  return (
    <div id='loginP'>
      <h2>Crea tu cuenta</h2>
      <form onSubmit={handleRegister}>
        <div className='input'>
            <div>
            <p>Nombre Completo</p>
            <input name="nombreCompletoU" type="text" className="form-control" placeholder="Emilio Vidal Cavazos Páez" />
          </div>
          <div>
            <p>Datos del Usuario</p>
            <textarea name="datos" type="text" className="form-control"  placeholder="Trabajdor desde el 2020 en el area de FullStack tengo 19 años0"></textarea>
          </div>
          <div>
            <p>Correo Electronico</p>
            <input name="email" type="text" className="form-control" id="emailInp" placeholder="name@example.com" />
          </div>
          <div>
            <p>Contraseña</p>
            <input name="password" type="password" className="form-control" id="passwordInp" placeholder="Password" />
          </div>
          <div>
            <p>Confirma Contraseña</p>
            <input name="confirmPassword" type="password" className="form-control" placeholder="Repite tu contraseña" />
          </div>
        </div>
      </form>
      <button type="submit" className='inicialS'style={{cursor: "pointer"}} >Registrar</button>
      <Link to="/login" className='inicialS'>Iniciar sesión</Link>
    </div>
  );
}

export default CreaCuenta;
