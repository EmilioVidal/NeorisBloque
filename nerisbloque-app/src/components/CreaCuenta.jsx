import React from 'react'
import './Bienvenido.css'


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

        <button className='inicialS'>Iniciar sesión</button>
    </div>
  )
}

export default CreaCuenta
