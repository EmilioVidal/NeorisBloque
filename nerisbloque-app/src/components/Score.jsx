import React from 'react'
import './Score.css'
import currency from '../img/Digital Currency Logo.png';


function Score({profileImageUrl, coins}) {
  return (
    <div id='ScoreId'>
        <div id='usuarioP'>
            <img id='logo' src={profileImageUrl} alt="Usuario" />
            <div id='puntos'><span>{coins}</span></div>
            <img id='money' src={currency} alt="Dogomoneda" />
        </div>
    </div>
  )
}

export default Score
