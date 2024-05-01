import React, { useState, useEffect } from 'react';
import './Upload.css';
import { ref as storageRef, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AppBar from "../components/AppBar";
import { storage } from '../API/FirebaseConfig';
import './ImageList.css';

function Upload({ profileImageUrl }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [showSubmitButton, setShowSubmitButton] = useState(false);
    const [imageList, setImageList] = useState([]);
    const imageListRef = storageRef(storage, "images/");
    const [imageUpload, setImageUpload] = useState(null);
    const [user, setUser] = useState(null);

    const courses = [
        { id: 1, name: 'GITCO' },
        { id: 2, name: 'GITSEC' },
        { id: 3, name: 'PromtE' },
        // Agrega más opciones de cursos según sea necesario
    ];

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    const handleImageUpload = (event) => {
        const image = event.target.files[0];
        setSelectedImage(URL.createObjectURL(image));
        setImageUpload(image);
        setShowSubmitButton(selectedCourse !== '' && image !== null);
    };

    const handleCourseSelect = (event) => {
        const course = event.target.value;
        setSelectedCourse(course);
        setShowSubmitButton(course !== '' && selectedImage !== null);
    };

    const handleSubmit = () => {
        if (!selectedImage || !selectedCourse || !user) return;
        
        const userId = user.uid; // Obtener el UID del usuario
        const imageName = `${userId}_${selectedCourse}`;
        const imageRef = storageRef(storage, `images/${imageName}`);
        
        const metadata = {
            contentType: selectedImage.type
        };
        
        uploadBytes(imageRef, imageUpload, metadata)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then((url) => {
                        setImageList((prev) => [...prev, url]);
                        alert("Imagen subida correctamente");
                    })
                    .catch(error => {
                        console.error("Error al obtener la URL de descarga:", error);
                    });
    
                // Reiniciar valores después de subir la imagen correctamente
                setSelectedImage(null);
                setSelectedCourse('');
                setShowSubmitButton(false);
            })
            .catch(error => {
                console.error("Error al subir la imagen:", error);
            });
    };
    
    

    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                });
            });
        });
    }, []);

    return (
        <div>
            <AppBar profileImageUrl={profileImageUrl} />
            <div className="upload-container">
                <h1>Subir Imagen</h1>
                <div className="course-dropdown">
                    <label htmlFor="course-select">Seleccione un curso:</label>
                    <select id="course-select" value={selectedCourse} onChange={handleCourseSelect}>
                        <option value="">Seleccione un curso</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.name}>{course.name}</option>
                        ))}
                    </select>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    id="input-image"
                />
                <button onClick={() => document.getElementById('input-image').click()} id='select-img'>
                    Seleccionar imagen
                </button>
                {showSubmitButton && (
                    <button onClick={handleSubmit} id='enviar'>
                        Enviar
                    </button>
                )}
                <div className="image-container">
                    {selectedImage && <img src={selectedImage} alt='' />}
                </div>
            </div>
        </div>
    );
}

export default Upload;
