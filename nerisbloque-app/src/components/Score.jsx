import React from 'react'
import './Score.css'
import currency from '../img/Digital Currency Logo.png';


function Score({profileImageUrl}) {
  return (
    <div id='ScoreId'>
        <div id='usuarioP'>
            <img id='logo' src={profileImageUrl} alt="Usuario" />
            <div id='puntos'><span>999</span></div>
            <img id='money' src={currency} alt="Dogomoneda" />
        </div>
    </div>
  )
}

export default Score
