import React from 'react'
import Backbtn from '../img/BackBTN.png'
import currency from '../img/Digital Currency Logo.png';
import AppBar from "../components/AppBar"
import ProfileAvatar from './ProfileAvatar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';
import NombreUsuario from "./NombreUsuario";

import './Usuario.css'
import DatosUsuario from './DatosUsuario';


function Usuario({ profileImageUrl, nombreU, datosU }) {
    let puntos = 999;
    let nivelU = 60;
    //estos son cuantos cursos se han completado de cada cosa
    let percentageTotal = 4;
    let percentagePE = 2;
    let percentageGC = 1;
    let percentageGAS = 1;


  return (
    <div>
        <AppBar profileImageUrl={profileImageUrl} />
        <header>
            <div id = "arriba-us">
                <Link to='/game'>
                    <button type='button' id='boton-atras' style={{cursor:'pointer'}}><img src={Backbtn} alt="Flecha para atras" /></button>
                </Link>
                <Link to="/edit">
                    <button type='button' id='edit-p' style={{cursor:'pointer'}}>Editar Perfil</button>
                </Link>
            </div>
        </header>

        <div id='div-info-us'>
            <div id='foto-P' style={{ width:"400px", height:"auto"}}>
                <ProfileAvatar imageUrl={profileImageUrl} />
            </div>
            <div id='info-us'>
                <NombreUsuario nombre={nombreU}/>
                <DatosUsuario datos={datosU}/>
            </div>
        </div>
        <div id='linea-us'></div>

        <h3 id='progresoT'>Progreso</h3>
        <div id='progreso'> 
            <div id='circulos'>

                <div className='circP'>
                    <h3 className='title-curso'>En todos los cursos</h3>
                    <CircularProgressbar id="porc-toal"
                        value={Math.round((percentageTotal/7)*100)}
                        text={`${Math.round((percentageTotal/7)*100)}%`}
                        styles={buildStyles({
                            // Rotation of path and trail, in number of turns (0-1)
                            rotation: 0,
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'round',
                            // Text size
                            textSize: '16px',
                            // How long animation takes to go from one percentage to another, in seconds
                            pathTransitionDuration: 0.5,
                            // Colors
                            pathColor: `rgba(62, 152, 199, ${Math.round((percentageTotal/7)*100) / 100})`,
                            textColor: '#f88',
                            trailColor: '#d6d6d6',
                            backgroundColor: '#3e98c7',
                        })}
                    />
                </div>
                <div className='circP'>
                    <h3 className='title-curso'>Promt Engineering</h3>
                    <CircularProgressbar id="porc-PE"
                            value={Math.round((percentagePE/3)*100)}
                            text={`${Math.round((percentagePE/3)*100)}%`}
                            styles={buildStyles({
                                // Rotation of path and trail, in number of turns (0-1)
                                rotation: 0,
                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'round',
                                // Text size
                                textSize: '16px',
                                // How long animation takes to go from one percentage to another, in seconds
                                pathTransitionDuration: 0.5,
                                // Colors
                                pathColor: `rgba(62, 152, 199, ${Math.round((percentagePE/3)*100) / 100})`,
                                textColor: '#f88',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                            })}
                            />
                </div>
                <div className='circP'>
                    <h3 className='title-curso'>GitHub Copilot</h3>
                    <CircularProgressbar
                            value={Math.round((percentageGC/2)*100)}
                            text={`${Math.round((percentageGC/2)*100)}%`}
                            styles={buildStyles({
                                // Rotation of path and trail, in number of turns (0-1)
                                rotation: 0,
                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'round',
                                // Text size
                                textSize: '16px',
                                // How long animation takes to go from one percentage to another, in seconds
                                pathTransitionDuration: 0.5,
                                // Colors
                                pathColor: `rgba(62, 152, 199, ${Math.round((percentageGC/2)*100) / 100})`,
                                textColor: '#f88',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                            })}
                            />
                </div>
                <div className='circP'>
                    <h3 className='title-curso'>GitHub Advanced Security</h3>
                    <CircularProgressbar
                            value={Math.round((percentageGAS/2)*100)}
                            text={`${Math.round((percentageGAS/2)*100)}%`}
                            styles={buildStyles({
                                // Rotation of path and trail, in number of turns (0-1)
                                rotation: 0,
                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'round',
                                // Text size
                                textSize: '16px',
                                // How long animation takes to go from one percentage to another, in seconds
                                pathTransitionDuration: 0.5,
                                // Colors
                                pathColor: `rgba(62, 152, 199, ${Math.round((percentageGAS/2)*100) / 100})`,
                                textColor: '#f88',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                            })}
                            />
                </div>


            </div>

            <div id="linea-vertical"></div>

            <div id='zona-puntos'>
                <div id='puntos-us'>
                    <h2>Puntos</h2>
                    <img src={currency} alt="perro-puntos" />
                    <p id='num-puntos'>{puntos}</p>
                </div>
            </div>
        </div>
        <div id='linea-us' style={{ marginTop:"-100px"}}></div>

        <div id='nivel-center'>
            <div id='nivel-edit'>
                <h3>Nivel</h3>
                <progress value={nivelU} max="100"></progress>   
            </div>
            
        </div>
            
    </div>
  )
}

export default Usuario
