import React, { useState } from 'react';
import AppBar from './AppBar';
import './Upload.css';

function Upload({ profileImageUrl }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [showSubmitButton, setShowSubmitButton] = useState(false);

    const courses = [
        { id: 1, name: 'GPT' },
        { id: 2, name: 'Copilot' },
        { id: 3, name: 'IA' },
        // Agrega más opciones de cursos según sea necesario
    ];

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result); // Guardar la imagen como base64
                setShowSubmitButton(selectedCourse !== '' && reader.result !== ''); // Habilitar el botón "Enviar" si se ha seleccionado un curso y una imagen
            };
            reader.readAsDataURL(file); // Convertir la imagen a base64
        }
    };

    const handleCourseSelect = (event) => {
        const course = event.target.value;
        setSelectedCourse(course);
        setShowSubmitButton(course !== '' && selectedImage !== null); // Habilitar el botón "Enviar" si se ha seleccionado un curso y una imagen
    };

    const handleSubmit = async () => {
        console.log(selectedCourse);
        console.log(selectedImage);

        // Aquí deberías enviar selectedImage y selectedCourse al backend para su almacenamiento
    };

    return (
        <div>
            <AppBar profileImageUrl={profileImageUrl} />
            <div className="upload-container">
                <h1>Subir Imagen</h1>
                <div className="course-dropdown">
                    <label htmlFor="course-select">Seleccionar curso:</label>
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
                <button onClick={() => document.getElementById('input-image').click()}>
                    Seleccionar imagen
                </button>
                {showSubmitButton && (
                    <button onClick={handleSubmit}>
                        Enviar
                    </button>
                )}
                {selectedImage && (
                    <div className="image-container">
                        <img src={selectedImage} alt="Imagen seleccionada" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Upload;
