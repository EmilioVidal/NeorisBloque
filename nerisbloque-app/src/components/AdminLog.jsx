import React from 'react'
import './Bienvenido.css'

function AdminLog() {
  return (
    <div id='loginP'>
      <h2>Bienvenido Administrador</h2>
    
        <div className='input'>
            <div>
                <p>Email</p>
                <input type="text" />
            </div>
            <div>
                <p>Contraseña</p>
                <input type="password" />
            </div>
        </div>
      
        <div id='post-login'>
            <label>
                <input type="checkbox"/> Recuérdame
            </label>
                <a href="">Olvide mi contraseña</a>
            </div>

        <button className='inicialS'>Iniciar sesión</button>
    </div>
  )
}

export default AdminLog
