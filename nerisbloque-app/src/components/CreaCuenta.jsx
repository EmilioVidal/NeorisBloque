import React from 'react';
import { Link } from 'react-router-dom';
import './Bienvenido.css';
import { auth, database } from '../API/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';  // Cambio: importa 'set' en lugar de 'push'

function CreaCuenta() {

  const handleRegister = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const fullName = event.target.nombreCompletoU.value;
    const coins = 0;
    const PromtE = 0;
    const GITCO = 0;
    const GITSEC = 0;
    const score = 0;
    const level = 0;
    const rol = 'user';
    const allCompletedCourses = 6;
    const userData = event.target.datos.value;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Crear usuario con Email y Contraseña
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Usar 'set' para agregar datos a la base de datos usando el UID del usuario
      const userRef = ref(database, `users/${user.uid}`);
      set(userRef, {
        email: email,
        fullName: fullName,
        userData: userData,
        coins: coins,
        allCompletedCourses: allCompletedCourses,
        completedCourses: {
            PromtE: PromtE,
            GITCO: GITCO,
            GITSEC: GITSEC
          },
        level: level,
        score: score,
        rol: rol
      });

      console.log("Usuario creado y datos agregados a la base de datos bajo el UID de autenticación", user);
      alert("Usuario creado y datos agregados a la base de datos bajo el UID de autenticación")
      // Redirección o manejo adicional del estado del usuario podría ir aquí
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
      </form>
      <Link to="/login" className='inicialS'>Iniciar sesión</Link>
    </div>
  );
}

export default CreaCuenta;
