## Equipo 3
-Edgar Patricio Olalde Sepúlveda - A01424082
-Diego de Jesús Esparza Ruiz  - A00837527
-Luis Gerardo Juárez García - A00836928 
-Emilio Vidal Cavaos Páez A00835995
-Gerardo Daniel Garcia de la Garza - A00836801
#
Ese es el repositorio donde se encuenta todo el codigo para la pagina web en el archivo de nerisbloque-app y el codigo del juego en scriptsJuego 
### Enlases:
Video:
https://drive.google.com/file/d/11QqTkXeHi-mE1CiqE6R7yfrGqrl-AiHn/view?usp=sharing 

Página Web: videojuego-fd243.firebaseapp.com
#
## Neoris App
Este projecto fue desarollado para la empresa de Neoris la cual nos pidio integrar una pagina web y un videojuego con el cual incitemos a sus empleados a tomar los cursos que pide la empresa

## Descripción
El equipo ha creado una web dinámica con el objetivo de incentivar a los empleados de Neoris a completar los cursos requeridos por la empresa. Esta solución incluye un juego interactivo que permite a los empleados divertirse mientras aprenden, haciendo el proceso de formación más atractivo y motivador. Las tecnologías Utilizadas fueron React para la creación de una interfaz de usuario interactiva y eficiente, JavaScript para la lógica y funcionalidad del frontend, Firebase Realtime Database para el almacenamiento y la sincronización en tiempo real de datos unity: Para el desarrollo del videojuego.

## Recorido por las paginas y su funcionamiento 
### Login
En esta primera página, el empleado de Neoris puede iniciar sesión si ya cuenta con una cuenta. Para probarlo, puedes usar las credenciales gera@tec.mx y 123456.
![image](https://github.com/EmilioVidal/Reto-Bloque/assets/110851981/a14d4f81-e353-40b6-ad9d-e006a73e1f20)

### Registrarte
Esta página es para los nuevos usuarios. Completando la información solicitada, pueden crear una cuenta que se guardará en la base de datos.
![image](https://github.com/EmilioVidal/Reto-Bloque/assets/110851981/78576c05-9928-4944-95c3-4d41788912ec)

### Admin
Si eres administrador, tienes un login especial que está verificado en la base de datos. Además, puedes cambiar el estatus de un usuario desde la misma base de datos.
![image](https://github.com/EmilioVidal/Reto-Bloque/assets/110851981/8d04b942-480e-4410-977a-bb8b693ab4ba)

Al ingresar como administrador, tienes acceso a toda la información de los empleados, la cual puedes filtrar por la columna que desees.
![image](https://github.com/EmilioVidal/Reto-Bloque/assets/110851981/6872fefc-cb4f-44f0-9c91-a83f6dfacd3e)

También puedes ver cuando un empleado sube una certificación o un comprobante de curso completado, y decidir si está completo o no. Si seleccionas la opción de que está completo, esto se actualizará en la base de datos y se reflejará en la página de perfil del empleado. En caso de seleccionar la otra opción, la foto simplemente se borrará.
![image](https://github.com/EmilioVidal/Reto-Bloque/assets/110851981/ca80fe3f-a83f-431c-9310-b132f9722ee9)

### Pagina Principal
En esta pagina puedes ver un ranking de los trabajadores con la intención de incentivar a estos a completar mas cursos y jugar al juego
Opciones en la pagina
- Mandar Avances: en esta pagina puedes mostrar tus avances en el curso
- Jugar: puedes jugar al juego
- Perfil: vas al perfil donde tienes tu información
- Salir: Haces un log out
- Rewards: Puedes canjear recompensas
- Ajustes: Puedes editar tu perfil
- Foto de perfil: con este borón puedes ir al perfil de usuario o a sus ajustes
![image](https://github.com/EmilioVidal/Reto-Bloque/assets/110851981/2df91832-fcff-43b7-b467-f7c527b9afcf)

### Mandar avances
En esta sección, puedes subir la evidencia de algún avance o forma de verificar que el certificado esté completo.

Cómo funciona:
1. Seleccionar curso: Elige el curso del que deseas subir la imagen.
2. Seleccionar imagen: Selecciona la foto que deseas subir como evidencia de tu avance.
3. Subir imagen: Envía la foto a la base de datos, donde el administrador podrá revisarla.
![image](https://github.com/EmilioVidal/Reto-Bloque/assets/110851981/40905923-7a56-4d6c-bd87-d8e63f107161)

### Jugar
Aquí puedes disfrutar del juego, que consta de dos partes distintas:

1. Modo de Niveles:
- Avanza a través de diferentes niveles, cada uno con sus propios desafíos.
- Para desbloquear un nivel, debes completar el nivel anterior y también tener un curso completado asociado. Además, puedes utilizar power-ups para mejorar tu rendimiento.
- Gana monedas mientras juegas, las cuales se pueden canjear por mejoras en el juego o en la sección de recompensas.

2. Modo de Correr Infinito:
- En esta modalidad, controlarás a un personaje (una cabra) con el objetivo de correr lo más lejos posible.
- Utiliza los power-ups que hayas ganado previamente al completar cursos para mejorar tu desempeño y alcanzar distancias aún mayores.
- Gana monedas mientras juegas, las cuales se pueden canjear por mejoras en el juego o en la sección de recompensas.
![image](https://github.com/EmilioVidal/Reto-Bloque/assets/110851981/2e5c7c5c-b6ca-4c37-8751-69c5b7db8484)

### Perfil
En esta sección se puede ver toda la información del empleado. Esta esta dividida en 3 partes:

1. Información del Empleado: Aquí se muestra el nombre del empleado y otros datos relevantes sobre su perfil.

2. Progreso
- Se visualiza el progreso del usuario en forma de gráficos, los cuales se llenan gradualmente según el avance del usuario en los cursos.
- Además, se muestra el número de monedas que el usuario ha obtenido, tanto por completar cursos como por jugar al juego.

3. Power Ups: Esta sección muestra gráficamente los power-ups que el usuario ha adquirido.
![image](https://github.com/EmilioVidal/Reto-Bloque/assets/110851981/c83dedc6-7026-437f-90bc-11da64eadb78)

### Editar Perfil y Ajustes
En esta sección, los usuarios tienen la capacidad de modificar su información personal el cual es su nombre y otros datos relevantes.
![image](https://github.com/EmilioVidal/Reto-Bloque/assets/110851981/fa4f4af8-b096-46e6-b0a5-da163f0f52d7)

### Rewards
En esta sección puedes cambiar las monedas que consiguio el usuario en el juego para personalizar a su personaje
![image](https://github.com/EmilioVidal/Reto-Bloque/assets/110851981/5e9bd4e9-db95-48c6-8f7a-8c1aabde5620)
