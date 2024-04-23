import React from 'react'
import Backbtn from '../img/BackBTN.png'
import userImage from '../img/User.png';
import currency from '../img/Digital Currency Logo.png';
import AppBar from "../components/AppBar"
import ProfileAvatar from './ProfileAvatar';
import { Link } from 'react-router-dom';


import './Usuario.css'

function Usuario({ profileImageUrl }) {
    var  puntos = 999;
  return (
    <div>
        <AppBar />
        <header>
            <div id = "arriba-us">
                <Link to='/game'>
                    <button type='button' id='boton-atras'><img src={Backbtn} alt="Flecha para atras" /></button>
                </Link>
                <Link to="/edit">
                    <button type='button' id='edit-p'>Editar Perfil</button>
                </Link>
            </div>
        </header>

        <div id='div-info-us'>
            <div id='foto-P' style={{ width:"400px", height:"auto"}}>
                <ProfileAvatar imageUrl={profileImageUrl} />
            </div>
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
                <p id='num-puntos'>{puntos}</p>
            </div>
        </div>
        <h3>Progreso en los cursos</h3>
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

export default Usuario
