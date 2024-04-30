import React, { useState, useEffect } from 'react';
import { database } from '../API/FirebaseConfig'; // Asegúrate de que la ruta es correcta
import { ref, onValue } from 'firebase/database';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filterEmail, setFilterEmail] = useState('');
  const [filterFullName, setFilterFullName] = useState('');
  const [filterUserData, setFilterUserData] = useState('');

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

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // La dependencia vacía asegura que esto se ejecute solo una vez

  const handleFilterEmailChange = (event) => {
    setFilterEmail(event.target.value);
  };

  const handleFilterFullNameChange = (event) => {
    setFilterFullName(event.target.value);
  };

  const handleFilterUserDataChange = (event) => {
    setFilterUserData(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    (!filterEmail || (user.email && user.email.toLowerCase().startsWith(filterEmail.toLowerCase()))) &&
    (!filterFullName || (user.fullName && user.fullName.toLowerCase().startsWith(filterFullName.toLowerCase()))) &&
    (!filterUserData || (user.userData && user.userData.toLowerCase().startsWith(filterUserData.toLowerCase())))
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Correo Electrónico</TableCell>
                <TableCell>Nombre Completo</TableCell>
                <TableCell>Datos del Usuario</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow key={index}>
                <TableCell>{typeof user.email === 'string' ? user.email : 'Correo no disponible'}</TableCell>
                <TableCell>{typeof user.fullName === 'string' ? user.fullName : 'Nombre no disponible'}</TableCell>
                <TableCell>{typeof user.userData === 'string' ? user.userData : 'No especificado'}</TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
// linea 98 agrega el no especificado como nombre
// en la linea 99 marcaba error en userData por algo de cadena de texto-string
export default UserList;
