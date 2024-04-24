import Bienvenido from './components/Bienvenido';
import CreaCuenta from './components/CreaCuenta';
import AdminLog from './components/AdminLog';
import Usuario from './components/Usuario';
import EditP from './components/EditP';
import AdminView from './components/AdminView';
import Rewards from './components/Rewards';
import Game from './components/Game';
import ResponsiveAppBar from './components/AppBar'
import Upload from "./components/Upload"
import React, {useState} from 'react';
import userImage from './img/User.png';
import Score from './components/Score';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

 


function App() {
    var nombre= "Pedro pica Pierda";
    var datos = "Bro ipsum dolor sit amet twister wheels taco glove, gear jammer park derailleur stunt shreddin giblets couloir sucker hole pow huck.";
    const [profileImageUrl, setProfileImageUrl] = useState(userImage);


  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Bienvenido />} />
                <Route path="/bienvenido" element={<Bienvenido />} />
                <Route path="/bar" element={<ResponsiveAppBar profileImageUrl={profileImageUrl} />} />
                <Route path="/creaCuenta" element={<CreaCuenta />} />
                <Route path="/game" element={<Game profileImageUrl={profileImageUrl} />} />
                <Route path="/adminLog" element={<AdminLog />} />
                <Route path="/usuario" element={<Usuario profileImageUrl={profileImageUrl} />} />
                <Route path="/edit" element={<EditP profileImageUrl={profileImageUrl} setProfileImageUrl={setProfileImageUrl}  />} />
                <Route path="/adminView" element={<AdminView profileImageUrl={profileImageUrl}/>} />
                <Route path="/rewards" element={<Rewards profileImageUrl={profileImageUrl}/>} />
                <Route path="/upload" element={<Upload profileImageUrl={profileImageUrl}/>} />
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;