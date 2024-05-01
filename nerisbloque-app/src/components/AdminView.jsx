import React from 'react'
import "./AdminView.css"
import AppBar from "../components/AppBar"
import UserList from '../components/UserList'
import ImageList from '../components/ImageList'


function AdminView({profileImageUrl}) {
 
  return (
    <div>
    <AppBar profileImageUrl={profileImageUrl} />
      <div id='panel-Admin'>
        <h2>Panel Administración</h2>
        <div id='admin-info'>
            <img src="" alt="" />
            <p>Nombre de Administrador</p>
        </div>
      </div>
      <div id='tabla'>
        <h3>Tabla de datos</h3>
        <UserList />
        <ImageList />
      </div>
    </div>
  )
}

export default AdminView
