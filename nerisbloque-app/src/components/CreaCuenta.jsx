import React from 'react'
import './Bienvenido.css'
import { Link } from 'react-router-dom';


function CreaCuenta() {
  return (
    <div id='loginP'>
      <h2>Crea tu cuenta</h2>
    
        <div className='input'>
            <div>
                <p>Email</p>
                <input type="text" />
            </div>
            <div>
                <p>Contraseña</p>
                <input type="password" />
            </div>
            <div>
                <p>Repite tu contraseña</p>
                <input type="password" />
            </div>
        </div>

        <Link to="/game" className='inicialS'>Iniciar sesión</Link>
    </div>
  )
}

export default CreaCuenta
