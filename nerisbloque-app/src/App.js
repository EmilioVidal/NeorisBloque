import { useState } from 'react';
import Game from "./components/Game"
import Footer from "./components/Footer"
import AppBar from "./components/AppBar"
import Login from "./components/Login"
import Account from './components/Account';
import Bienvenido from './components/Bienvenido';
import CreaCuenta from './components/CreaCuenta';
import AdminLog from './components/AdminLog';
import Score from './components/Score';
import Usuario from './components/Usuario';
import EditP from './components/EditP';
import AdminView from './components/AdminView';
import Reward from './components/Rewards';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

 


function App() {
    const[count, setCount] = useState(0);
    const aumentar = () => {
        setCount(count+1)
    }
  return (
    <div>
        <BrowserRouter>
            <AppBar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/game" element={<Game count={count} plus={aumentar}/>} />
                <Route path="/account" element={<Account />} />
                <Route path="/bienvenido" element={<Bienvenido />} />
                <Route path="/creaCuenta" element={<CreaCuenta />} />
                <Route path="/score" element={<Score />} />
                <Route path="/adminLog" element={<AdminLog />} />
                <Route path="/usuario" element={<Usuario />} />
                <Route path="/edit" element={<EditP />} />
                <Route path="/adminView" element={<AdminView />} />
                <Route path="/reward" element={<Reward />} />
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;