import React, { useState, useEffect } from 'react';
import { database } from '../API/FirebaseConfig';
import { ref, onValue } from 'firebase/database';
import { format } from 'date-fns';
import './UserList.css'; // Importamos el archivo CSS

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filterEmail, setFilterEmail] = useState('');
  const [filterFullName, setFilterFullName] = useState('');
  const [filterUserData, setFilterUserData] = useState('');
  const [filterCoins, setFilterCoins] = useState('');
  const [filterDate, setFilterDate] = useState('');
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
            coins: data[key].coins,
            lastLogin: data[key].lastLogin ? format(new Date(data[key].lastLogin), 'yyyy-MM-dd HH:mm:ss') : ''
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

  const handleFilterChange = (filterType) => {
    setActiveFilter(filterType);
  };

  const handleFilterValueChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'email':
        setFilterEmail(value);
        break;
      case 'nombre':
        setFilterFullName(value);
        break;
      case 'datos':
        setFilterUserData(value);
        break;
      case 'monedas':
        setFilterCoins(value);
        break;
      case 'date':
        setFilterDate(value);
        break;
      default:
        break;
    }
  };

  const filteredUsers = users.filter(user =>
    (!filterEmail || (user.email && user.email.toLowerCase().startsWith(filterEmail.toLowerCase()))) &&
    (!filterFullName || (user.fullName && user.fullName.toLowerCase().startsWith(filterFullName.toLowerCase()))) &&
    (!filterUserData || (user.userData && user.userData.toLowerCase().startsWith(filterUserData.toLowerCase()))) &&
    (!filterCoins || (user.coins != null && user.coins.toString().startsWith(filterCoins))) &&
    (!filterDate || (user.lastLogin && user.lastLogin.startsWith(filterDate)))
  );

  return (
    <div className="user-list-container">
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange('email')}>Filtrar por Correo Electrónico</button>
        <button onClick={() => handleFilterChange('nombre')}>Filtrar por Nombre Completo</button>
        <button onClick={() => handleFilterChange('datos')}>Filtrar por Datos del Usuario</button>
        <button onClick={() => handleFilterChange('monedas')}>Filtrar por Monedas</button>
        <button onClick={() => handleFilterChange('date')}>Filtrar por Último Inicio de Sesión (Fecha)</button>
      </div>
      {(activeFilter === 'email' || activeFilter === 'nombre' || activeFilter === 'datos' || activeFilter === 'monedas') && (
        <input
          placeholder={`Filtrar por ${activeFilter}`}
          name={activeFilter}
          value={
            activeFilter === 'email' ? filterEmail :
            activeFilter === 'nombre' ? filterFullName :
            activeFilter === 'datos' ? filterUserData :
            filterCoins
          }
          onChange={handleFilterValueChange}
          className="filter-input"
        />
      )}
      {activeFilter === 'date' && (
        <input
          placeholder="Filtrar por Último Inicio de Sesión (Fecha)"
          type="date"
          name="date"
          value={filterDate}
          onChange={handleFilterValueChange}
          className="filter-input"
        />
      )}
      <table className="user-table">
        <thead>
          <tr>
            <th>Correo Electrónico</th>
            <th>Nombre Completo</th>
            <th>Datos del Usuario</th>
            <th>Monedas</th>
            <th>Último Inicio de Sesión</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{typeof user.email === 'string' ? user.email : 'Correo no disponible'}</td>
              <td>{typeof user.fullName === 'string' ? user.fullName : 'Nombre no disponible'}</td>
              <td>{typeof user.userData === 'string' ? user.userData : 'No especificado'}</td>
              <td>{typeof user.coins === 'number' ? user.coins : 'No especificado'}</td>
              <td>{user.lastLogin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
