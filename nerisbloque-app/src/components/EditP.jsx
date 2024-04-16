import React from 'react'
import Backbtn from '../img/BackBTN.png'
import userImage from '../img/User.png';
import CambiarNombre from '../img/CMbtn.png';
import CambiarDatos from '../img/CDbtn.png';
import AppBar from "../components/AppBar"


import './EditP.css';

function EditP() {
  return (
    <div>
        <AppBar />
        <header>
            <div id = "arriba-edit">
                <button type='button' id='boton-atras'  onClick={() => console.log("hola")}><img src={Backbtn} alt="Flecha para atras" /></button>
            </div>
        </header>

        <div id='div-info-edit'>
            <img src={userImage} alt="Imagen de Usuario" />
            <div id='info-edit'>
                <h3 id='nombre-edit'>Nombre de Usuario</h3>
                <span id='datos-edit'>
                Bro ipsum dolor sit amet twister wheels taco glove, gear jammer park derailleur stunt shreddin giblets couloir sucker hole pow huck.
                </span>
            </div>
        </div>

        <div id='cambiar-btn'>
            <button type='button'> <img src={CambiarNombre} alt="" /></button>
            <button type='button'> <img src={CambiarDatos} alt="" /></button>
        </div>

        <div id='nivel-center'>
            <div id='nivel-edit'>
                <h3>Cursos</h3>
                <progress value="50" max="100"></progress>
                <h3>Habilidades</h3>
                <progress value="55" max="100"></progress>   
            </div>
        </div>

        <div id='select-avatar'>
            <h3>Selección de Avatar</h3>
            <div id='avatares'>
                <div className='av'></div>
                <div className='av'></div>
            </div>
        </div>
        
        <div id='accesorios-avatar'>
            <h3>Accesorios</h3>
            <div id='accesorios'>
                <div className='acc'></div>
                <div className='acc'></div>
                <div className='acc'></div>
            </div>
        </div>
    </div>
  )
}

export default EditP
