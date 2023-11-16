import React from 'react';
import {NavLink} from 'react-router-dom';
import Logo from '../imagenes/logo.png';
import Dog from '../imagenes/PIDOG.jpg';
import style from '../style/LandingPage.module.css';
import face from '../imagenes/FB.ico';
import inst from '../imagenes/inst.ico';
import twit from '../imagenes/twit.ico';

export default function LandingPage() {
  return (
    <div>
         <section className={style.secCabecera}>
      <div className={style.circle}></div>
      <header className={style.Header}>
        <img className={style.logo} src={Logo} alt="Logo" />
      </header>
    </section>
    <div className={style.content}>
      <div className={style.textBox}>
        <h2> ¡Bienvenido a Dog Breeds <br /><span> Explorer!</span> <span role="img" aria-label="huella">🐾</span></h2>
        <p>
        Aquí en Dog Breeds Explorer, creemos que cada raza de perro tiene su propia personalidad única y encanto.
        Nuestro objetivo es ayudarte a descubrir y aprender más sobre las diferentes razas de perros, 
        sus personalidades y características.
        </p>
        <div className={style.btn}>
          <NavLink className={style.NavLink} to="/dogs/home">
            ¡Únete ahora mismo!
          </NavLink>
        </div>
      </div>
      <div className={style.imgBox}>
        <img className={style.Dogs} src={Dog} alt='Dog' />
      </div>
      <ul className={style.sci}>
        <li><a href='www.ejmplo.com'><img src={face} alt='facebook'/></a></li>
        <li><a href='www.ejmplo.com'><img src={inst} alt='instagram'/></a></li>
        <li><a href='www.ejmplo.com'><img src={twit} alt='twitter'/></a></li>
      </ul>
    </div>
    </div>
  )
}
