import Footer from "./components/Footer"
import AppBar from "./components/AppBar"
import Bienvenido from './components/Bienvenido';
import CreaCuenta from './components/CreaCuenta';
import AdminLog from './components/AdminLog';
import Score from './components/Score';
import Usuario from './components/Usuario';
import EditP from './components/EditP';
import AdminView from './components/AdminView';
import Rewards from './components/Rewards';
import Game from './components/Game';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

 


function App() {
  return (
    <div>
        <BrowserRouter>
            <AppBar />
            <Routes>
                <Route path="/" element={<Bienvenido />} />
                <Route path="/bienvenido" element={<Bienvenido />} />
                <Route path="/creaCuenta" element={<CreaCuenta />} />
                <Route path="/game" element={<Game />} />
                <Route path="/score" element={<Score />} />
                <Route path="/adminLog" element={<AdminLog />} />
                <Route path="/usuario" element={<Usuario />} />
                <Route path="/edit" element={<EditP />} />
                <Route path="/adminView" element={<AdminView />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;