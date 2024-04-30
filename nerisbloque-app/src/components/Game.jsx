import React from "react";
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import './Game.css';
import { Link } from 'react-router-dom';
import AppBar from "../components/AppBar"
import { signOut } from 'firebase/auth';
import { auth } from '../API/FirebaseConfig';


const Game = ({profileImageUrl, user}) => {

  const handleLogout = async () => {
    try {
        await signOut(auth);
        console.log("Usuario ha cerrado sesión exitosamente.");
        console.log(user.uid);
        // Aquí puedes redirigir al usuario a la pantalla de inicio o hacer otras acciones post-logout
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div>
        <AppBar profileImageUrl={profileImageUrl} />
        <div className="gamepage">  
        <h1>Game</h1>
        <Box sx={{ 
            bgcolor: 'gray',
            width: '300px',
            height: '240px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Link to={"/game"}>
              <Button sx={{ bgcolor: 'black', width: '200px', color: 'white', margin: '10px'}}>
                  Jugar
              </Button>
            </Link>
            <Link to={"/usuario"}>
            <Button sx={{ bgcolor: 'black', width: '200px', color: 'white', margin: '10px'}}>
                Perfil
            </Button>
            </Link>
            <Link to={"/bienvenidos"} onClick={handleLogout}>
            <Button sx={{ bgcolor: 'black', width: '200px', color: 'white', margin: '10px'}}>
                Salir
            </Button>
            </Link>
            </div>
        </Box>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Link to={"/rewards"}>
                  <Button sx={{ bgcolor: 'purple', width: '100px', height: '100px', color: 'white', margin: '10px'}}
                  variant="contained" >
                  Rewards
                  </Button>
                </Link>
                <Link to={"/edit"}>
                <Button sx={{ bgcolor: '#666666', width: '100px', height: '100px', color: 'white', margin: '10px'}}
                variant="contained">
                Ajustes
                </Button>
                </Link>
        </div>
      </div>
    </div>
  );
};

export default Game;
