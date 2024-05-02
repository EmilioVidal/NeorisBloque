import React, { useState, useEffect } from 'react';
import { database } from '../API/FirebaseConfig';
import { ref, onValue } from 'firebase/database';
import "./HighScore.css";

function HighScore() {
    const [users, setUsers] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [filterValue, setFilterValue] = useState('');
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
                        lastLogin: data[key].lastLogin,
                        score: data[key].score,
                        powerUps: data[key].powerUps,
                        rol: data[key].rol
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
        setSortBy(filterType);
    };

    const sortedUsers = [...users].sort((a, b) => {
        if (sortBy) {
            return b[sortBy] - a[sortBy];
        }
        return 0;
    });

    const filteredUsers = sortedUsers.filter(user =>
        (!filterValue || (user[activeFilter] && user[activeFilter].toString().startsWith(filterValue))) &&
        user.rol !== 'admin'
    );

    return (
        <div>
            <h2 className="HS-heading">Ranking</h2>
            <div>
                <div>
                    <div className="filtro-botones">
                        <button onClick={() => handleFilterChange('coins')}>Filtrar por Monedas</button>
                        <button onClick={() => handleFilterChange('powerUps')}>Filtrar por Nivel</button>
                        <button onClick={() => handleFilterChange('score')}>Filtrar por Distancia</button>
                    </div>
                </div>
            </div>
            <table className="highS-table">
                <thead>
                        <tr id="titulosT">
                            <th>Nombre</th>
                            <th>Monedas</th>
                            <th>Nivel</th>
                            <th>Distancia en Free Run</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={index} id="infoT">
                                <td>{typeof user.fullName === 'string' ? user.fullName : 'Nombre no disponible'}</td>
                                <td>{typeof user.coins === 'number' ? user.coins : 'No especificado'}</td>
                                <td>{typeof user.powerUps === 'number' ? user.powerUps : 'No especificado'}</td>
                                <td>{typeof user.score === 'number' ? user.score.toFixed(2) : 'No especificado'}</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </div>
    );
}

export default HighScore;
