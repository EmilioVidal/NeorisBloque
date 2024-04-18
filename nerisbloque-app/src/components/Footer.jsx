import React from 'react'
import './Pooper.css'
import { Link } from 'react-router-dom';


export default function Footer() {
  return (
    <div id='footer'>
      <p>No tienes cuenta?</p>
      <Link to="/creaCuenta" className='Regi'>Registrate</Link>
    </div>
  );
}
