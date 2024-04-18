import React from 'react'
import "./AdminView.css"
import AppBar from "../components/AppBar"


function AdminView() {
 
  return (
    <div>
    <AppBar />
      <div id='panel-Admin'>
        <h2>Panel Administración</h2>
        <div id='admin-info'>
            <img src="" alt="" />
            <p>Nombre de Administrador</p>
        </div>
      </div>
      <div id='graficas'>
        <h3>Gráficas</h3>
      </div>
    </div>
  )
}

export default AdminView
