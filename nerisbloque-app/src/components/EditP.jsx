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
import { ref, update } from 'firebase/database';
import { database } from '../API/FirebaseConfig';

function EditP({ user, profileImageUrl, setProfileImageUrl, nombreU, userData, setUserData}) {

    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState('');

    const [editingDatos, setEditingDatos] = useState(false);
    const [newDatos, setNewDatos] = useState('');

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        const newImageUrl = URL.createObjectURL(file);
        setProfileImageUrl(newImageUrl);
    };

    const handleEditImageClick = () => {
        const inputImage = document.getElementById('input-image');
        inputImage?.click();
    };

    const handleNameEditClick = () => {
        setEditingName(true);
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNameSave = () => {
        console.log("User object:", user);
        console.log("User key:", user?.uid);
        console.log("New name:", newName);
    
        if (user && user.uid && newName.trim() !== "") {
            const userRef = ref(database, `users/${user.uid}`);
            const updates = { fullName: newName.trim() };
            update(userRef, updates)
                .then(() => {
                    setUserData({ ...userData, fullName: newName.trim() });
                    setEditingName(false);
                    console.log("Nombre actualizado en la base de datos.");
                }).catch((error) => {
                    console.error("Error updating name in database:", error);
                });
        } else {
            console.error("User not defined, not authenticated, or name is empty.",user.uid);
        }
    };

    const handleDatosSave = () => {
        if (user && user.uid && newDatos.trim() !== "") {
            const userRef = ref(database, `users/${user.uid}`);
            const updates = { userData: newDatos.trim() };
            update(userRef, updates)
                .then(() => {
                    setUserData({ ...userData, userData: newDatos.trim() });
                    setEditingDatos(false);
                }).catch((error) => {
                    console.error("Error updating user data in database:", error);
                });
        } else {
            console.error("User not defined, not authenticated, or data is empty.");
        }
    };

    const handleDatosEditClick = () => {
        setEditingDatos(true);
    };

    const handleDatosChange = (event) => {
        setNewDatos(event.target.value);
    };

    return (
        <div>
            <AppBar profileImageUrl={profileImageUrl} />
            <header>
                <div id="arriba-edit">
                    <Link to='/usuario'>
                        <button type='button' id='boton-atras'><img src={Backbtn} alt="Back arrow" /></button>
                    </Link>
                </div>
            </header>

            <div id='div-info-edit'>
                <div id='box-img'>
                    <div style={{ width:"300px", height:"auto"}}>
                        <ProfileAvatar imageUrl={profileImageUrl} />
                    </div>
                    <input id='input-image' type="file" accept="image/*" onChange={handleProfileImageChange} style={{ display: 'none' }} /> 
                    <button id='edit-img' onClick={handleEditImageClick}><img id='cuadro' src={editImg} alt="Edit icon" /></button>
                </div>
                <div id='info-edit'>
                    {editingName ? (
                        <div id='inputNombre'>
                            <input type="text" value={newName} onChange={handleNameChange} id='input-newName'/>
                            <button onClick={handleNameSave} id='inputBtn-name'>Guardar</button>
                        </div>
                    ) : (
                        <NombreUsuario nombre={nombreU}/>
                    )}
                    {editingDatos ? (
                        <div id='inputDatos'>
                            <textarea id='input-newDatos' cols="30" rows="10" value={newDatos} onChange={handleDatosChange}></textarea>
                            <button onClick={handleDatosSave} id='inputBtn-datos'>Guardar</button>
                        </div>
                    ) : (
                        <DatosUsuario datos={userData && typeof userData.userData === 'string' ? userData.userData : 'Información no disponible'} />
                    )}
                </div>
            </div>

            <div id='cambiar-btn'>
                <button onClick={handleNameEditClick} type='button'><img src={CambiarNombre} alt="Change name button" /></button>
                <button onClick={handleDatosEditClick} type='button'><img src={CambiarDatos} alt="Change data button" /></button>
            </div>

            <footer>
                <Link to='/bienvenido'>
                    <button type='button' id='logoutbtn'><img src={LOGOUTbtn} alt="Logout button" /></button>
                </Link>
            </footer>
        </div>
    );
}

export default EditP;
