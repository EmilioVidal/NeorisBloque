import React, { useState, useEffect } from 'react';
import { database } from '../API/FirebaseConfig'; // Asegúrate de que la ruta es correcta
import { ref, onValue } from 'firebase/database';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
  const [filterCoins, setFilterCoins] = useState('');
  const [activeFilter, setActiveFilter] = useState('');

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
            userData: data[key].userData,
            coins: data[key].coins
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

  const handleFilterChange = (filterType) => {
    setActiveFilter(filterType);
  };

  const handleFilterValueChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'Email':
        setFilterEmail(value);
        break;
      case 'Nombre':
        setFilterFullName(value);
        break;
      case 'Datos':
        setFilterUserData(value);
        break;
      case 'Monedas':
        setFilterCoins(value);
        break;
      default:
        break;
    }
  };

  const filteredUsers = users.filter(user =>
    (!filterEmail || (user.email && user.email.toLowerCase().startsWith(filterEmail.toLowerCase()))) &&
    (!filterFullName || (user.fullName && user.fullName.toLowerCase().startsWith(filterFullName.toLowerCase()))) &&
    (!filterUserData || (user.userData && user.userData.toLowerCase().startsWith(filterUserData.toLowerCase()))) &&
    (!filterCoins || (user.coins != null && user.coins.toString().startsWith(filterCoins)))
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <div style={{ marginBottom: '16px' }}>
          <Button variant="outlined" onClick={() => handleFilterChange('Email')}>Filtrar por Correo Electrónico</Button>
          <Button variant="outlined" onClick={() => handleFilterChange('Nombre')}>Filtrar por Nombre Completo</Button>
          <Button variant="outlined" onClick={() => handleFilterChange('Datos')}>Filtrar por Datos del Usuario</Button>
          <Button variant="outlined" onClick={() => handleFilterChange('Monedas')}>Filtrar por Monedas</Button>
        </div>
        {activeFilter && (
          <TextField sx={{ width: '100%' }}
            label={`Filtrar por ${activeFilter}`}
            variant="outlined"
            name={activeFilter}
            value={activeFilter === 'Email' ? filterEmail : activeFilter === 'Nombre' ? filterFullName : activeFilter === 'Datos' ? filterUserData : filterCoins}
            onChange={handleFilterValueChange}
            style={{ marginBottom: '16px' }}
          />
        )}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Correo Electrónico</TableCell>
                <TableCell>Nombre Completo</TableCell>
                <TableCell>Datos del Usuario</TableCell>
                <TableCell>Monedas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{typeof user.email === 'string' ? user.email : 'Correo no disponible'}</TableCell>
                  <TableCell>{typeof user.fullName === 'string' ? user.fullName : 'Nombre no disponible'}</TableCell>
                  <TableCell>{typeof user.userData === 'string' ? user.userData : 'No especificado'}</TableCell>
                  <TableCell>{typeof user.coins === 'number' ? user.coins : 'No especificado'}</TableCell>
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


