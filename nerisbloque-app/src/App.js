import Bienvenido from './components/Bienvenido';
import CreaCuenta from './components/CreaCuenta';
import AdminLog from './components/AdminLog';
import Usuario from './components/Usuario';
import EditP from './components/EditP';
import AdminView from './components/AdminView';
import Rewards from './components/Rewards';
import Game from './components/Game';
import AppBar from './components/AppBar'
import React, {useState} from 'react';
import userImage from './img/User.png';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

 


function App() {
    const [profileImageUrl, setProfileImageUrl] = useState(userImage);

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Bienvenido />} />
                <Route path="/bienvenido" element={<Bienvenido />} />
                <Route path="/bar" element={<AppBar profileImageUrl={profileImageUrl} />} />
                <Route path="/creaCuenta" element={<CreaCuenta />} />
                <Route path="/game" element={<Game />} />
                <Route path="/adminLog" element={<AdminLog />} />
                <Route path="/usuario" element={<Usuario profileImageUrl={profileImageUrl} />} />
                <Route path="/edit" element={<EditP setProfileImageUrl={setProfileImageUrl} />} />
                <Route path="/adminView" element={<AdminView />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;