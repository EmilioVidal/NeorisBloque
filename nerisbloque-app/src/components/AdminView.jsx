import React from 'react'
import Slider from "react-slick";
import "./AdminView.css"
import AppBar from "../components/AppBar"
import  foto from '../img/Gift.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function AdminView() {
    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2
      };
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
        <Slider {...settings}>
        <div>
            <img src={foto} alt="" />
        </div>
      </Slider>
      </div>
    </div>
  )
}

export default AdminView
