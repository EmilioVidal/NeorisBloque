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
import React, {useState, useEffect} from 'react';
import userImage from './img/User.png';
import UserList from './components/UserList';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { database } from './API/FirebaseConfig'; // Asegúrate de que la ruta es correcta
import { ref, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {

    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    //const [nombreU, setNombreU] = useState("");
    


    const auth = getAuth();
    const [userData, setUserData] = useState(null); // Cambia la inicialización de userData


    useEffect(() => {
      if (user) {
          const userRef = ref(database, `users/${user.uid}`);
          onValue(userRef, (snapshot) => {
              const fetchedUserData = snapshot.val();
              if (fetchedUserData) {
                  setUserData(fetchedUserData);
              } else {
                  console.error("No user data found");
              }
          }, {
              onlyOnce: true
          });
      }
  }, [user]);

 
  
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            console.log("Authenticated User:", currentUser);
            setUser(currentUser);
        } else {
            setUser(null);
            setUserData(null);
        }
    });

    return () => unsubscribe();
}, [auth]);


    useEffect(() => {
      const usersRef = ref(database, 'users');
      const unsubscribe = onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        const userList = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            userList.push({
              email: data[key].email,
              fullName: data[key].fullName,
              userData: data[key].userData
            });
          }
        }
        setUsers(userList);
      }, {
        onError: (error) => console.error(error)
      });
      
      return () => unsubscribe();
    }, []); // La dependencia vacía asegura que esto se ejecute solo una vez
  
    useEffect(() => {
        if (email) {
          const userData = users.find(user => user.email === email);
          console.log('Nombre del usuario:', userData ? userData.fullName : 'Usuario no encontrado');
          setUserData(userData);
        }
      }, [email, users]);

    const [profileImageUrl, setProfileImageUrl] = useState(userImage);

    // Usa directamente los valores de userData para el nombre y los datos del usuario
    const nombre = userData ? userData.fullName : "pp";
    const datos = userData ? userData.userData : "pp";


//usar un use efect 

//creat un objeto 
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Bienvenido setEmail={setEmail} />}/>{/*poner los set*/}
                <Route path="/bar" element={<ResponsiveAppBar profileImageUrl={profileImageUrl} />} />
                <Route path="/creaCuenta" element={<CreaCuenta />} />
                <Route path="/game" element={<Game profileImageUrl={profileImageUrl} />} />
                <Route path="/adminLog" element={<AdminLog />} />
                <Route path="/usuario" element={<Usuario profileImageUrl={profileImageUrl} nombreU={userData ? userData.fullName : ""} datosU={userData ? userData.userData : ""} />} />
                <Route path="/edit" element={<EditP user={user} profileImageUrl={profileImageUrl} setProfileImageUrl={setProfileImageUrl} nombreU={userData ? userData.fullName : ""} setNombreU={(nombre) => setUserData({...userData, fullName: nombre})} datosU={userData ? userData.userData : ""} setDatosU={(datos) => setUserData({...userData, userData: datos})} userData={userData} setUserData={setUserData} />} />
                <Route path="/adminView" element={<AdminView profileImageUrl={profileImageUrl}/>} />
                <Route path="/rewards" element={<Rewards profileImageUrl={profileImageUrl}/>} />
                <Route path="/upload" element={<Upload profileImageUrl={profileImageUrl}/>} />
                <Route path="/users" element={<UserList />} /> {/* Pasar las variables nombre y datos como props */}
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;