import React, { useState } from 'react';
import Backbtn from '../img/BackBTN.png';
import CambiarNombre from '../img/CMbtn.png';
import CambiarDatos from '../img/CDbtn.png';
import LOGOUTbtn from '../img/LOGOUTbtn.png';
import editImg from '../img/pencil_icon.png';
import AppBar from "../components/AppBar";
import ProfileAvatar from "./ProfileAvatar";

import './EditP.css';
import { Link } from 'react-router-dom';

function EditP({ profileImageUrl, setProfileImageUrl, nombreU}) {
    var nombre = "Pedro Sanches Sanches";
    var Datos = "Bro ipsum dolor sit amet twister wheels taco glove, gear jammer park derailleur stunt shreddin giblets couloir sucker hole pow huck.";

    const [nombreU, setNombreU] = useState(nombre);
    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState('');

    const [DatosU, setDatosU] = useState(Datos);
    const [editingDatos, setEditingDatos] = useState(false);
    const [newDatos, setNewDatos] = useState('');

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

    const handleNameEditClick = () => {
        setEditingName(true);
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNameSave = () => {
        setNombreU(newName);
        setEditingName(false);
    };
    
    const handleDatosEditClick = () => {
        setEditingDatos(true);
    };

    const handleDatosChange = (event) => {
        setNewDatos(event.target.value);
    };

    const handleDatosSave = () => {
        setDatosU(newDatos);
        setEditingDatos(false);
    };

    return (
        <div>
            <AppBar profileImageUrl={profileImageUrl} />
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
                        <ProfileAvatar imageUrl={profileImageUrl} />
                    </div>
                    <input id='input-image' type="file" accept="image/*" onChange={handleProfileImageChange} style={{ display: 'none' }} /> 
                    <button id='edit-img' onClick={handleEditImageClick}><img id='cuadro' src={editImg} alt="" /></button>
                </div>
                <div id='info-edit'>
                    {editingName ? (
                        <div id='inputNombre'>
                            <input type="text" value={newName} onChange={handleNameChange} id='input-newName'/>
                            <button onClick={handleNameSave} id='inputBtn-name'>Guardar</button>
                        </div>
                    ) : (
                        <div>
                            <h3 id='nombre-edit'>{nombreU}</h3>
                        </div>
                    )}
                    {editingDatos ? (
                        <div id='inputDatos' >
                            <textarea name="" id='input-newDatos' cols="30" rows="10" onChange={handleDatosChange}>{newDatos}</textarea>
                            <button onClick={handleDatosSave} id='inputBtn-datos'>Guardar</button>
                        </div>
                    ) : (
                        <div>
                            <span id='datos-edit'>{DatosU}</span>
                        </div>
                    )}
                </div>
            </div>

            <div id='cambiar-btn'>
                <button onClick={handleNameEditClick} type='button'><img src={CambiarNombre} alt="Boton para cambiar nombre" /></button>
                <button onClick={handleDatosEditClick} type='button'> <img src={CambiarDatos} alt="Boton para cambiar datos" /></button>
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
