import React from "react";
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import './Game.css';
import AppBar from "../components/AppBar"

const Game = ({count, plus, minus}) => {
  return (
    <div>
        <AppBar />
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
            <Button sx={{ bgcolor: 'black', width: '200px', color: 'white', margin: '10px'}}>
                Jugar
            </Button>
            <Button sx={{ bgcolor: 'black', width: '200px', color: 'white', margin: '10px'}}>
                Perfil
            </Button>
            <Button sx={{ bgcolor: 'black', width: '200px', color: 'white', margin: '10px'}}>
                Salir
            </Button>
            </div>
        </Box>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Button sx={{ bgcolor: 'purple', width: '100px', height: '100px', color: 'white', margin: '10px'}}>
                Rewards
                </Button>
                <Button sx={{ bgcolor: '#666666', width: '100px', height: '100px', color: 'white', margin: '10px'}}>
                Ajustes
                </Button>
        </div>
      </div>
    </div>
  );
};

export default Game;
