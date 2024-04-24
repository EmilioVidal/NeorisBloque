import React from 'react'
import Backbtn from '../img/BackBTN.png'
import currency from '../img/Digital Currency Logo.png';
import AppBar from "../components/AppBar"
import ProfileAvatar from './ProfileAvatar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';


import './Usuario.css'

function Usuario({ profileImageUrl }) {
    let puntos = 999;
    let cursosV = 1;
    let hamilidadesV = 60;
    let percentage = 4;


  return (
    <div>
        <AppBar profileImageUrl={profileImageUrl} />
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

        <h3>Progreso</h3>
        <div id='progreso'>   
            <div id='circulos'>

                <div className='circP'>
                    <CircularProgressbar
                        value={(percentage/10)*100}
                        text={`${(percentage/10)*100}%`}
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
                            pathColor: `rgba(62, 152, 199, ${((percentage/5)*100) / 100})`,
                            textColor: '#f88',
                            trailColor: '#d6d6d6',
                            backgroundColor: '#3e98c7',
                        })}
                    />
                </div>
                <div className='circP'>
                    <CircularProgressbar
                            value={(percentage/10)*100}
                            text={`${(percentage/10)*100}%`}
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
                                pathColor: `rgba(62, 152, 199, ${((percentage/5)*100) / 100})`,
                                textColor: '#f88',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                            })}
                            />
                </div>
                <div className='circP'>
                    <CircularProgressbar
                            value={(percentage/10)*100}
                            text={`${(percentage/10)*100}%`}
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
                                pathColor: `rgba(62, 152, 199, ${((percentage/5)*100) / 100})`,
                                textColor: '#f88',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                            })}
                            />
                </div>
                <div className='circP'>
                    <CircularProgressbar
                            value={(percentage/10)*100}
                            text={`${(percentage/10)*100}%`}
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
                                pathColor: `rgba(62, 152, 199, ${((percentage/5)*100) / 100})`,
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

        <div id='nivel-center'>
            <div id='nivel-edit'>
                <h3>Cursos</h3>
                <progress value={cursosV} max="5"></progress>
                <h3>Nivel</h3>
                <progress value={hamilidadesV} max="100"></progress>   
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
