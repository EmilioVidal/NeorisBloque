import React, { useState, useEffect } from 'react';
import { ref as storageRef, listAll, getDownloadURL, updateMetadata } from 'firebase/storage';
import { storage } from '../API/FirebaseConfig';
import { getDatabase, ref as databaseRef, set, get } from 'firebase/database';

const ImageList = () => {
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        const imageListRef = storageRef(storage, 'images/');

        listAll(imageListRef)
            .then(async (response) => {
                const promises = response.items.map((item) => {
                    return getDownloadURL(item).then((url) => {
                        // Obtener el nombre de usuario y el curso del nombre de la imagen
                        const [userId, course] = item.name.split('_');
                        return { url, userId, course };
                    });
                });

                const images = await Promise.all(promises);

                // Obtener los nombres de usuario correspondientes a los userIds
                const db = getDatabase();
                const userNamesPromises = images.map(({ userId }) => {
                    const userRef = databaseRef(db, `users/${userId}/fullName`); // Cambiado a fullName
                    return get(userRef).then((snapshot) => snapshot.val());
                });

                const userNames = await Promise.all(userNamesPromises);

                // Combinar la información de las imágenes con los nombres de usuario
                const imagesWithNames = images.map((image, index) => ({
                    ...image,
                    userName: userNames[index] || 'Nombre Desconocido', // Usar "Nombre Desconocido" si no hay nombre
                }));

                setImageList(imagesWithNames);
            })
            .catch((error) => {
                console.error('Error al listar las imágenes:', error);
            });
    }, []);

    const handleUpdateMetadata = async (userId, course) => {
        const imageName = `${userId}_${course}`;
        const imageRef = storageRef(storage, `images/${imageName}`);
    
        const newMetadata = {
            customMetadata: {
                completed: '1', // Cambia el parámetro de false a true
            },
        };
    
        try {
            await updateMetadata(imageRef, newMetadata);
            console.log('Metadatos actualizados correctamente.');
    
            // Actualizar el valor en la base de datos en tiempo real
            const db = getDatabase();
            const userRef = databaseRef(db, `users/${userId}`);
    
            // Obtener los cursos completados actuales del usuario y mantener los demás cursos sin cambios
            const snapshot = await get(userRef);
            const userData = snapshot.val();
            const completedCourses = userData.completedCourses || {};
    
            // Incrementar el valor o establecerlo en 1 si es la primera vez que se marca como completado
            completedCourses[course] = (completedCourses[course] || 0) + 1;
    
            await set(userRef, { ...userData, completedCourses });
            console.log('Valor en la base de datos actualizado correctamente.');
        } catch (error) {
            console.error('Error al actualizar los metadatos:', error);
        }
    };
    

    return (
        <div>
            <h1>Lista de Imágenes</h1>
            <div className="image-list">
                {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                        <img src={image.url} alt={`Imagen_${index}`} />
                        <p>{`Usuario: ${image.userName}, Curso: ${image.course}`}</p>
                        <button onClick={() => handleUpdateMetadata(image.userId, image.course)}>Marcar como completada</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageList;
