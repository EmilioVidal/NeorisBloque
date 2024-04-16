import React from 'react'
import './Score.css'
import userImage from '../img/User.png';
import currency from '../img/Digital Currency Logo.png';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Score() {
  return (
    <div id='ScoreId'>
        <div id='usuarioP'>
            <img id='logo' src={userImage} alt="Usuario" />
            <div id='puntos'><span>999</span></div>
            <img id='money' src={currency} alt="Dogomoneda" />
        </div>
    </div>
  )
}

export default Score
