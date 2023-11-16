import React from 'react';
import {NavLink} from 'react-router-dom';
import SearchBar from './Search';
import Logo from '../../imagenes/logo.png';
import style from '../../style/Navbar.module.css';
import {useDispatch} from 'react-redux';
import { getAllDogs } from '../../redux/actions/actions';


export default function Navbar({ onSearch }) {
  
  const dispatch = useDispatch();

  const handleResetDogs =()=>{
    dispatch(getAllDogs());
  }

  return (
    <nav className={style.secCabecera}>
      <div className={style.Header}>
        <div className={style.logoContainer}>
          <NavLink to='/dogs/home'><img className={style.logo} src={Logo} alt="Logo" /></NavLink>
        </div>
        <div className={style.NavLinks}>
          <NavLink className={style.NavLink} to="/dogs/home">
            <button className={style.rest} onClick={handleResetDogs}>Inicio</button>
          </NavLink>
          <NavLink className={style.NavLink} to="/dogs/RegisterDogBreeds">
            Register Dog Breeds
          </NavLink>
        </div>
        <div className={style.searchContainer}>
          <SearchBar className={style.search} onSearch={onSearch} />
        </div>
      </div>
    </nav>
  )
}
