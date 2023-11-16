import React from "react";
import { useDispatch } from "react-redux";
import { orderDogBreeds } from "../../redux/actions/actions";
import style from '../../style/Ordenar.module.css'

export default function Ordenar() {
    const dispatch = useDispatch();
    function onSelectsChange(e) {
      dispatch(orderDogBreeds(e.target.value));
    }
    return (
        <div className={style.Ordenar_container}>
         <label htmlFor="ordenarSelect"> ordenamiento:</label>
          <select name="select" onChange={onSelectsChange}>
            <option value="all">Todas</option>
            <option value="asc">A-Z</option>
            <option value="des">Z-A</option> 
            <option value="weight asc">Mayor peso</option>
            <option value="weight des">Menor peso</option>
          </select>
        </div>
      );
} 