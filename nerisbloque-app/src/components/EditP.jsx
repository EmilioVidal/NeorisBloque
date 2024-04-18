import React from 'react'
import Backbtn from '../img/BackBTN.png'
import userImage from '../img/User.png';
import CambiarNombre from '../img/CMbtn.png';
import CambiarDatos from '../img/CDbtn.png';
import LOGOUTbtn from '../img/LOGOUTbtn.png'
import AppBar from "../components/AppBar"


import './EditP.css';
import { Link } from 'react-router-dom';

function EditP() {
  return (
    <div>
        <AppBar />
        <header>
            <div id = "arriba-edit">
            <Link to='/usuario'>
                <button type='button' id='boton-atras'><img src={Backbtn} alt="Flecha para atras" /></button>
            </Link>
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
        <footer>
            <Link to='/bienvenido'>
                <button type='button' id='logoutbtn'><img src={LOGOUTbtn} alt="logout btn" onClick={() => console.log("adios")}/></button>
            </Link>
        </footer>
    </div>
  )
}

export default EditP
