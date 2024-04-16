import React from 'react'
import './Bienvenido.css'
import { Link } from 'react-router-dom';


function Bienvenido() {
  return (
    <div id='loginP'>
      <h2>Bienvenido</h2>
    
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
        <Link to="/game" className='inicialS'>Iniciar sesión</Link>
        <div id='lineaS'>
            <div className='linea-horizontal'></div>
            <span>ó</span>
            <div className='linea-horizontal'></div>
        </div>
        

        <Link to="/adminLog" className='AdminB'>Administrador</Link>


    </div>
  )
}

export default Bienvenido
