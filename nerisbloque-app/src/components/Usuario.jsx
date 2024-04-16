import React from 'react'
import Backbtn from '../img/BackBTN.png'
import userImage from '../img/User.png';
import LOGOUTbtn from '../img/LOGOUTbtn.png'
import currency from '../img/Digital Currency Logo.png';
import AppBar from "../components/AppBar"

import './Usuario.css'

function Usuario() {
  return (
    <div>
        <AppBar />
        <header>
            <div id = "arriba-us">
                <button type='button' id='boton-atras'  onClick={() => console.log("hola")}><img src={Backbtn} alt="Flecha para atras" /></button>
                <button type='button' id='edit-p' onClick={() => console.log("adios")}>Editar Perfil</button>
            </div>
        </header>

        <div id='div-info-us'>
            <img src={userImage} alt="Imagen de Usuario" />
            <div id='info-us'>
                <h3 id='nombre-us'>Nombre de Usuario</h3>
                <span id='datos-us'>
                Bro ipsum dolor sit amet twister wheels taco glove, gear jammer park derailleur stunt shreddin giblets couloir sucker hole pow huck. Endo ripper face shots, smear skid rail saddle cornice butter backside. Spin bonk big ring tele pow gnar, white room gapers steeps pipe brain bucket flow T-bar. Saddle chain suck skinny gear jammer crank. Switch heli newschooler spin, brain bucket white room sucker hole table top shreddin line piste gnar rock-ectomy. Grom ACL bunny slope park gondy, couloir rig.
                </span>
            </div>
        </div>
        <div id='linea-us'></div>

        <div id='zona-puntos'>
            <div id='puntos-us'>
                <h2>Puntos</h2>
                <img src={currency} alt="perro-puntos" />
                <p id='num-puntos'>999</p>
            </div>
        </div>

        <footer>
            <button type='button' id='logoutbtn'><img src={LOGOUTbtn} alt="logout btn" onClick={() => console.log("adios")}/></button>
        </footer>
    </div>
  )
}

export default Usuario
