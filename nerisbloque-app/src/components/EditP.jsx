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


function EditP({ user, profileImageUrl, setProfileImageUrl, nombreU, setNombreU, datosU, setDatosU, userData, setUserData }) {

    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState('');

    const [editingDatos, setEditingDatos] = useState(false);
    const [newDatos, setNewDatos] = useState('');

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        const newImageUrl = URL.createObjectURL(file);
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
        if (user && user.uid && newName.trim() !== "") {  // Asegura que newName no esté vacío y que sea diferente de blanco
            const userRef = ref(database, `users/${user.uid}`);
            update(userRef, { fullName: newName.trim() })  // Usar trim para eliminar espacios extra
            .then(() => {
                console.log("Nombre actualizado correctamente en la base de datos.");
                setUserData({ ...userData, fullName: newName.trim() });
                setEditingName(false);
                console.log("Actualizando datos en:", userRef.toString());
            }).catch((error) => {
                console.error("Error al actualizar el nombre en la base de datos:", error);
            });
        } else {
            console.error("Usuario no está definido, no autenticado o el nombre está vacío.");
        }
    };
    

    const handleDatosSave = () => {
        if (user && user.uid && newDatos.trim() !== "") {  
            const userRef = ref(database, `users/${user.uid}`);
            update(userRef, { userData: newDatos.trim() })  
            .then(() => {
                console.log("Datos de usuario actualizados correctamente en la base de datos.");
                setUserData({ ...userData, userData: newDatos.trim() }); 
                setEditingDatos(false);
            }).catch((error) => {
                console.error("Error al actualizar los datos de usuario en la base de datos:", error);
            });
        } else {
            console.error("Usuario no está definido, no autenticado o los datos están vacíos.");
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
                            <DatosUsuario datos={userData && typeof userData.userData === 'string' ? userData.userData : 'Información no disponible'} />
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
