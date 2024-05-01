import React from 'react'
import "./AdminView.css"
import UserList from '../components/UserList'
import ImageList from '../components/ImageList'
import NeorisPP from '../img/NEORIS logo light.png'
import './AdminView.css'


function AdminView({nombreU}) {
 
  return (
    <div>
         <div id= "AdminTopB">
                <img src={NeorisPP} alt="foto de la compañia" /><span>ADMIN</span>
        </div>
        <h2 id="admin-title">Panel de Administración</h2>
      <div id='panel-Admin'>
        <h3>Nombre del Administrador:</h3>
        <h4>{nombreU}</h4>
      </div>
      <div id='tabla'>
        <UserList />
        <div id="mid-line"></div>
        <ImageList />
      </div>
    </div>
  )
}

export default AdminView
