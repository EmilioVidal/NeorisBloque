import React, { useState } from 'react';
import Backbtn from '../img/BackBTN.png';
import CambiarNombre from '../img/CMbtn.png';
import CambiarDatos from '../img/CDbtn.png';
import LOGOUTbtn from '../img/LOGOUTbtn.png';
import editImg from '../img/pencil_icon.png';
import AppBar from "../components/AppBar";
import ProfileAvatar from "./ProfileAvatar";
import NombreUsuario from './NombreUsuario';
import './EditP.css';
import { Link } from 'react-router-dom';
import DatosUsuario from './DatosUsuario';
import { ref, set } from 'firebase/database';
import { database } from '../API/FirebaseConfig'; 


function EditP({ profileImageUrl, setProfileImageUrl, nombreU, setNombreU, datosU, setDatosU, user}) {

    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState('');

    const [editingDatos, setEditingDatos] = useState(false);
    const [newDatos, setNewDatos] = useState('');

    const handleProfileImageChange = (event) => {
        const newImageUrl = URL.createObjectURL(event.target.files[0]);
        console.log('New image URL:', newImageUrl);
        setProfileImageUrl(newImageUrl);
        //aqui se podria actializar la foto en la base de datos
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
        console.log("Intentando guardar el nombre nuevo:", newName);  // Para depuración
        if (user && user.uid) {
            const userRef = ref(database, `users/${user.uid}/fullName`);
            set(userRef, newName)
                .then(() => {
                    console.log("Nombre actualizado correctamente en la base de datos.");
                    setNombreU(newName); // Actualiza el estado local
                    setEditingName(false); // Sale del modo edición
                    console.log("Nombre actualizado en el estado local:", nombreU);
                })
                .catch((error) => {
                    console.error("Error al actualizar el nombre en la base de datos:", error);
                });
        } else {
            console.error("Usuario no está definido o autenticado.");
        }
    };
    
    const handleDatosEditClick = () => {
        setEditingDatos(true);
    };

    const handleDatosChange = (event) => {
        setNewDatos(event.target.value);
    };

    const handleDatosSave = () => {
        const userRef = ref(database, `users/${user.uid}`);
        set(ref(database, `${userRef}/userData`), newDatos);
        setDatosU(newDatos);
        setEditingDatos(false);
    };

    return (
        <div>
            <AppBar profileImageUrl={profileImageUrl} />
            <header>
                <div id="arriba-edit">
                    <Link to='/usuario'>
                        <button type='button' id='boton-atras' style={{cursor:'pointer'}}><img src={Backbtn} alt="Flecha para atrás" /></button>
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
                            <NombreUsuario  nombre={nombreU}/>
                        </div>
                    )}
                    {editingDatos ? (
                        <div id='inputDatos' >
                            <textarea name="" id='input-newDatos' cols="30" rows="10" onChange={handleDatosChange}>{newDatos}</textarea>
                            <button onClick={handleDatosSave} id='inputBtn-datos'>Guardar</button>
                        </div>
                    ) : (
                        <div>
                            <DatosUsuario datos={datosU}/>
                        </div>
                    )}
                </div>
            </div>

            <div id='cambiar-btn'>
                <button onClick={handleNameEditClick} type='button'><img src={CambiarNombre} alt="Boton para cambiar nombre" /></button>
                <button onClick={handleDatosEditClick} type='button'><img src={CambiarDatos} alt="Boton para cambiar datos" /></button>
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
