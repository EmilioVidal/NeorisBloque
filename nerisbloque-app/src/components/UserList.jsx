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
  const [filterCourseGITCO, setFilterCourseGITCO] = useState('');
  const [filterCourseGITSEC, setFilterCourseGITSEC] = useState('');
  const [filterCoursePromtE, setFilterCoursePromtE] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterScore, setFilterScore] = useState('');
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
            GITCO: data[key].GITCO,
            GITSEC: data[key].GITSEC,
            PromtE: data[key].PromtE,
            allCompletedCourses: data[key].allCompletedCourses,
            level: data[key].level,
            score: data[key].score,
            rol: data[key].rol,
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
      case 'GITCO':
        setFilterCourseGITCO(value);
        break;
      case 'GITSEC':
        setFilterCourseGITSEC(value);
        break;
      case 'PromtE':
        setFilterCoursePromtE(value);
        break;
      case 'cursos':
        setFilterCourse(value);
        break;
      case 'nivel':
        setFilterLevel(value);
        break;
      case 'puntuacion':
        setFilterScore(value);
        break;
      default:
        break;
    }
  };

  const filteredUsers = users.filter(user =>
    (!filterEmail || (user.email && user.email.toLowerCase().startsWith(filterEmail.toLowerCase()))) &&
    (!filterFullName || (user.fullName && user.fullName.toLowerCase().startsWith(filterFullName.toLowerCase()))) &&
    (!filterUserData || (user.userData && user.userData.toLowerCase().startsWith(filterUserData.toLowerCase()))) &&
    (!filterCoins || (user.coins != null && user.coins >= parseInt(filterCoins))) && // Filtrar monedas mayores o iguales
    (!filterCourseGITCO || (user.GITCO != null && user.GITCO >= parseInt(filterCourseGITCO))) && // Filtrar cursos GITCO mayores o iguales
    (!filterCourseGITSEC || (user.GITSEC != null && user.GITSEC >= parseInt(filterCourseGITSEC))) && // Filtrar cursos GITSEC mayores o iguales
    (!filterCoursePromtE || (user.PromtE != null && user.PromtE >= parseInt(filterCoursePromtE))) && // Filtrar cursos PromtE mayores o iguales
    (!filterCourse || (user.allCompletedCourses != null && user.allCompletedCourses >= parseInt(filterCourse))) && // Filtrar todos los cursos completados mayores o iguales
    (!filterLevel || (user.level != null && user.level >= parseInt(filterLevel))) && // Filtrar nivel mayor o igual
    (!filterScore || (user.score != null && user.score >= parseInt(filterScore))) && // Filtrar puntuación mayor o igual
    (!user.rol || user.rol.toLowerCase() !== 'admin') &&
    (!filterDate || (user.lastLogin && user.lastLogin.startsWith(filterDate)))
  );
  
  return (
    <div className="user-list-container">
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange('email')}>Filtrar por Correo Electrónico</button>
        <button onClick={() => handleFilterChange('nombre')}>Filtrar por Nombre Completo</button>
        <button onClick={() => handleFilterChange('datos')}>Filtrar por Datos del Usuario</button>
        <button onClick={() => handleFilterChange('monedas')}>Filtrar por Monedas</button>
        <button onClick={() => handleFilterChange('GITCO')}>Filtrar por Cursos de Github Copilot</button>
        <button onClick={() => handleFilterChange('GITSEC')}>Cursos de Github Advance Security</button>
        <button onClick={() => handleFilterChange('PromtE')}>Filtrar por Cursos de Promt Engineering</button>
        <button onClick={() => handleFilterChange('cursos')}>Filtrar por Curso Completado</button>
        <button onClick={() => handleFilterChange('nivel')}>Filtrar por Nivel</button>
        <button onClick={() => handleFilterChange('puntuacion')}>Filtrar por Puntuación</button>
        <button onClick={() => handleFilterChange('date')}>Filtrar por Último Inicio de Sesión (Fecha)</button>
      </div>
      {(activeFilter === 'email' || activeFilter === 'nombre' || activeFilter === 'datos' || activeFilter === 'monedas' || activeFilter === 'cursos' || activeFilter === 'nivel' || activeFilter === 'puntuacion' ||
      activeFilter === 'GITCO' ||
      activeFilter === 'GITSEC' ||
      activeFilter === 'PromtE' ) && (
        <input
          placeholder={`Filtrar por ${activeFilter}`}
          name={activeFilter}
          value={
            activeFilter === 'email' ? filterEmail :
            activeFilter === 'nombre' ? filterFullName :
            activeFilter === 'datos' ? filterUserData :
            activeFilter === 'GITCO' ? filterCourseGITCO :
            activeFilter === 'GITSEC' ? filterCourseGITSEC :
            activeFilter === 'PromtE' ? filterCoursePromtE :
            activeFilter === 'cursos' ? filterCourse :
            activeFilter === 'nivel' ? filterLevel :
            activeFilter === 'puntuacion' ? filterScore :
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
            <th>Cursos de Github Copilot</th>
            <th>Cursos de Github Advance Security</th>
            <th>Cursos de Promt Engineering</th>
            <th>Cursos totales Completado</th>
            <th>Nivel</th>
            <th>Puntuación</th>
            <th>Último Inicio de Sesión</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            user.rol && user.rol.toLowerCase() !== 'admin' &&
            <tr key={index}>
              <td>{typeof user.email === 'string' ? user.email : 'Correo no disponible'}</td>
              <td>{typeof user.fullName === 'string' ? user.fullName : 'Nombre no disponible'}</td>
              <td>{typeof user.userData === 'string' ? user.userData : 'No especificado'}</td>
              <td>{typeof user.coins === 'number' ? user.coins : 'No especificado'}</td>
              <td>{typeof user.GITCO === 'number' ? user.GITCO : 'No especificado'}</td>
              <td>{typeof user.GITSEC === 'number' ? user.GITSEC : 'No especificado'}</td>
              <td>{typeof user.PromtE === 'number' ? user.PromtE : 'No especificado'}</td>
              <td>{typeof user.allCompletedCourses === 'number' ? user.allCompletedCourses : 'No especificado'}</td>
              <td>{typeof user.level === 'number' ? user.level : 'No especificado'}</td>
              <td>{typeof user.score === 'number' ? user.score.toFixed(2) : 'No especificado'}</td>
              <td>{user.lastLogin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
