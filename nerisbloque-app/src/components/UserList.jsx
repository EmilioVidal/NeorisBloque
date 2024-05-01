import React, { useState, useEffect } from 'react';
import { database } from '../API/FirebaseConfig';
import { ref, onValue } from 'firebase/database';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { format } from 'date-fns';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filterEmail, setFilterEmail] = useState('');
  const [filterFullName, setFilterFullName] = useState('');
  const [filterUserData, setFilterUserData] = useState('');
  const [filterLastLogin, setFilterLastLogin] = useState('');

  useEffect(() => {
    const usersRef = ref(database, 'users');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const userList = [];
for (const key in data) {
  if (data.hasOwnProperty(key)) {
    const lastLogin = data[key].lastLogin;
    const formattedLastLogin = lastLogin ? format(new Date(lastLogin), 'yyyy-MM-dd') : ''; // Formatea la fecha si existe, de lo contrario, asigna una cadena vacía
    userList.push({
      email: data[key].email,
      fullName: data[key].fullName,
      userData: data[key].userData,
      lastLogin: formattedLastLogin // Asigna la fecha formateada
    });
  }
}
      
      setUsers(userList);
    }, {
      onError: (error) => console.error(error)
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
    
  }, []);

  const handleFilterEmailChange = (event) => {
    setFilterEmail(event.target.value);
  };

  const handleFilterFullNameChange = (event) => {
    setFilterFullName(event.target.value);
  };

  const handleFilterUserDataChange = (event) => {
    setFilterUserData(event.target.value);
  };

  const handleFilterLastLoginChange = (event) => {
    setFilterLastLogin(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    (!filterEmail || (user.email && user.email.toLowerCase().startsWith(filterEmail.toLowerCase()))) &&
    (!filterFullName || (user.fullName && user.fullName.toLowerCase().startsWith(filterFullName.toLowerCase()))) &&
    (!filterUserData || (user.userData && user.userData.toLowerCase().startsWith(filterUserData.toLowerCase()))) &&
    (!filterLastLogin || (user.lastLogin && user.lastLogin === filterLastLogin)) // Filtra por fecha de último inicio de sesión
  );
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <TextField
          label="Filtrar por Correo Electrónico"
          variant="outlined"
          value={filterEmail}
          onChange={handleFilterEmailChange}
          style={{ marginBottom: '16px' }}
        />
        <TextField
          label="Filtrar por Nombre Completo"
          variant="outlined"
          value={filterFullName}
          onChange={handleFilterFullNameChange}
          style={{ marginBottom: '16px' }}
        />
        <TextField
          label="Filtrar por Datos del Usuario"
          variant="outlined"
          value={filterUserData}
          onChange={handleFilterUserDataChange}
          style={{ marginBottom: '16px' }}
        />
<TextField
  label="Filtrar por Última Fecha de Acceso"
  type="date"
  variant="outlined"
  value={filterLastLogin}
  onChange={(event) => setFilterLastLogin(event.target.value)}
  style={{ marginBottom: '16px' }}
  InputLabelProps={{
    shrink: true,
  }}
/>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Correo Electrónico</TableCell>
                <TableCell>Nombre Completo</TableCell>
                <TableCell>Datos del Usuario</TableCell>
                <TableCell>Último Inicio de Sesión</TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{typeof user.email === 'string' ? user.email : 'Correo no disponible'}</TableCell>
                  <TableCell>{typeof user.fullName === 'string' ? user.fullName : 'Nombre no disponible'}</TableCell>
                  <TableCell>{typeof user.userData === 'string' ? user.userData : 'No especificado'}</TableCell>
                  <TableCell>{typeof user.lastLogin === 'string' ? user.lastLogin : 'No disponible'}</TableCell> 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>



        
      </div>
    </div>
  );
};

export default UserList;
