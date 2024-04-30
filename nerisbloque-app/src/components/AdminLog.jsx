import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref, getDatabase, onValue } from 'firebase/database';
import './Bienvenido.css';

function AdminLog() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const database = getDatabase();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Verificar si el usuario es administrador
      const userRef = ref(database, `users/${userId}`);
      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData && userData.rol === 'admin') {
          // Si es admin, redireccionar a /adminView
          navigate('/adminView');
        } else {
          // Si no es admin, mostrar error y desloguear
          setError('Acceso denegado. No tienes permisos de administrador.');
          auth.signOut();
        }
      }, {
        onlyOnce: true
      });
    } catch (error) {
      // Manejar errores de autenticación
      setError('Introduce un usuario valido');
    }
  };

  return (
    <div id='loginP'>
      <h2>Bienvenido Administrador</h2>
      <form onSubmit={handleLogin}>
        <div className='input'>
          <div>
            <p>Email</p>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <p>Contraseña</p>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
        </div>
      
        <div id='post-login'>
          <label>
            <input type="checkbox"/> Recuérdame
          </label>
          <a href="#">Olvidé mi contraseña</a>
        </div>
        <button type="submit" className='inicialS'>Iniciar sesión</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default AdminLog;
