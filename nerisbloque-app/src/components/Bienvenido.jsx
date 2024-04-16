import React from 'react'
import './Bienvenido.css'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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

        <button className='inicialS'>Iniciar sesión</button>

        <div id='lineaS'>
            <div className='linea-horizontal'></div>
            <span>ó</span>
            <div className='linea-horizontal'></div>
        </div>
        


        <button className='AdminB'>Administrador</button>


    </div>
  )
}

export default Bienvenido
