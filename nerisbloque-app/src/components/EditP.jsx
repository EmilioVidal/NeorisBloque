import React, { useState } from 'react';
import Backbtn from '../img/BackBTN.png';
import userImage from '../img/User.png';
import CambiarNombre from '../img/CMbtn.png';
import CambiarDatos from '../img/CDbtn.png';
import LOGOUTbtn from '../img/LOGOUTbtn.png';
import editImg from '../img/pencil_icon.png';
import AppBar from "../components/AppBar";
import FotoP from "./ProfileAvatar";

import './EditP.css';
import { Link } from 'react-router-dom';

var nombreU = 'Pedro Sanches Sanches';

function EditP({ profileImageUrl, setProfileImageUrl }) {
    const handleProfileImageChange = (event) => {
        const newImageUrl = URL.createObjectURL(event.target.files[0]);
        console.log('New image URL:', newImageUrl);
        setProfileImageUrl(newImageUrl);
    };

    const handleEditImageClick = () => {
        const inputImage = document.getElementById('input-image');
        if (inputImage) {
            inputImage.click();
        } else {
            console.error('Input image element not found.');
        }
    };

    return (
        <div>
            <AppBar />
            <header>
                <div id="arriba-edit">
                    <Link to='/usuario'>
                        <button type='button' id='boton-atras'><img src={Backbtn} alt="Flecha para atrás" /></button>
                    </Link>
                </div>
            </header>

            <div id='div-info-edit'>
                <div id='box-img'>
                    <div style={{ width:"300px", height:"auto"}}>
                        <FotoP imageUrl={profileImageUrl} />
                    </div>
                    <input id='input-image' type="file" accept="image/*" onChange={handleProfileImageChange} style={{ display: 'none' }} /> 
                    <button id='edit-img' onClick={handleEditImageClick}><img id='cuadro' src={editImg} alt="" /></button>
                </div>
                <div id='info-edit'>
                    <h3 id='nombre-edit'>{nombreU}</h3>
                    <span id='datos-edit'>
                        Bro ipsum dolor sit amet twister wheels taco glove, gear jammer park derailleur stunt shreddin giblets couloir sucker hole pow huck.
                    </span>
                </div>
            </div>

            <div id='cambiar-btn'>
                <button type='button'> <img src={CambiarNombre} alt="" /></button>
                <button type='button'> <img src={CambiarDatos} alt="" /></button>
            </div>

            <footer>
                <Link to='/bienvenido'>
                    <button type='button' id='logoutbtn'><img src={LOGOUTbtn} alt="logout btn" onClick={() => console.log("adios")} /></button>
                </Link>
            </footer>
        </div>
    );
}

export default EditP;
