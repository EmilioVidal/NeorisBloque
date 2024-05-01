import React, { useState, useEffect } from 'react';
import { ref as storageRef, listAll, getDownloadURL, updateMetadata, deleteObject } from 'firebase/storage';
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

    const handleUpdateMetadata = async (userId, course, completed) => {
        const imageName = `${userId}_${course}`;
        const imageRef = storageRef(storage, `images/${imageName}`);
    
        if (completed) {
            const newMetadata = {
                customMetadata: {
                    completed: '1', // Cambia el parámetro de false a true
                },
            };
        
            try {
                await updateMetadata(imageRef, newMetadata);
                console.log('Metadatos actualizados correctamente.');

                await deleteObject(imageRef); // Utilizar deleteObject() para eliminar la imagen de Firebase Storage
                console.log('Imagen eliminada de Firebase Storage.');
        
                // Actualizar el valor en la base de datos en tiempo real
                const db = getDatabase();
                const userRef = databaseRef(db, `users/${userId}`);
                const snapshot = await get(userRef);
                const userData = snapshot.val();
                const completedCourses = userData.completedCourses || {};
        
                // Incrementar el valor o establecerlo en 1 si es la primera vez que se marca como completado
                completedCourses[course] = (completedCourses[course] || 0) + 1;
        
                await set(userRef, { ...userData, completedCourses });
            
                console.log('Valor en la base de datos actualizado correctamente.');
                alert("Se envió correctamente la evaluación");
            } catch (error) {
                console.error('Error al actualizar los metadatos:', error);
            }
        } else {
            try {
                await deleteObject(imageRef); // Utilizar deleteObject() para eliminar la imagen de Firebase Storage
                console.log('Imagen eliminada de Firebase Storage.');
                alert("Imagen eliminada correctamente");
            } catch (error) {
                console.error('Error al eliminar la imagen:', error);
            }
        }
        window.location.reload();
    };
    
    

    return (
        <div>
            <h1>Verificación de Cursos</h1>
            <div className="image-list">
                {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                        <img src={image.url} alt={`Imagen_${index}`} />
                        <p>{`Usuario: ${image.userName}`}</p>
                        <p>{`Curso: ${image.course}`}</p>
                        <button id='confirm' onClick={() => handleUpdateMetadata(image.userId, image.course, true)}>Marcar completada</button>
                        <button id='no-confirm' onClick={() => handleUpdateMetadata(image.userId, image.course, false)}>No completado</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageList;
