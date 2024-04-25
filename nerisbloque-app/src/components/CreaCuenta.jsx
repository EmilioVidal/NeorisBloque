import React from 'react';
import { Link } from 'react-router-dom';
import './Bienvenido.css';
import { auth, database } from '../API/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, push } from 'firebase/database';

function CreaCuenta() {
  const handleRegister = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const fullName = event.target.nombreCompletoU.value;
    const userData = event.target.datos.value;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Usar push para agregar datos a la lista de usuarios
      const usersRef = ref(database, 'users');
      push(usersRef, {
        uid: user.uid,
        email: email,
        fullName: fullName,
        userData: userData
      });

      console.log("Usuario creado y datos agregados a la lista en la base de datos");
      // Aquí puedes añadir una redirección o manejo adicional del estado del usuario
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
            <textarea name="datos" className="form-control" placeholder="Trabajador desde el 2020 en el área de FullStack, tengo 19 años"></textarea>
          </div>
          <div>
            <p>Correo Electrónico</p>
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
          <button type="submit" className='inicialS' style={{cursor: "pointer"}}>Registrar</button>
        </div>
        <div className='input'>
            <button type="submit" className='inicialS'style={{cursor: "pointer", justifyContent:"center"}} >Registrar</button>
        </div>
      </form>
      <Link to="/login" className='inicialS'>Iniciar sesión</Link>
    </div>
  );
}

export default CreaCuenta;
