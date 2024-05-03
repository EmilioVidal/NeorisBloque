import React from 'react';
import AppBar from './AppBar';
import './GameIframe.css'; // Importa tu archivo CSS
import { Link } from 'react-router-dom'; // Importa Link
import Backbtn from '../img/BackBTN.png'; // Importa la imagen

function GameIframe({ profileImageUrl }) {
  return (
    <div>
    <AppBar profileImageUrl={profileImageUrl} />
      <Link to='/game'>
        <button type='button' id='boton-atras'><img src={Backbtn} alt="Back arrow" /></button>
      </Link>
    <div className="iframe-container">
      <iframe
        title="Juego"
        src="Web\index.html"
        width="900"
        height="600"
        allowFullScreen
      ></iframe>
    </div>
    </div>
  );
}

export default GameIframe;
