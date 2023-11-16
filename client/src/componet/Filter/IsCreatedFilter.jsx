import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterCrate, getAllDogs } from '../../redux/actions/actions';
import style from '../../style/Filter.module.css';

export default function IsCreatedFilter() {
  const dispatch = useDispatch();
  const iscreated = useSelector(state => state.iscreated);

  const handleIsCreatedChange = (event) => {
    if (event.target.value === 'true') {
      dispatch(filterCrate(true));
    } else if (event.target.value === 'false') {
      dispatch(filterCrate(false));
    } else {
      dispatch(getAllDogs());
    }
  };

  return (
    iscreated !== null && (
      <div className={style.filter_container}>
        <label htmlFor='filtroDogsCreados'> Perros:</label>
        <select onChange={handleIsCreatedChange}>
          <option value="all">Todos</option>
          <option value="false">Api</option>
          <option value="true">Creados</option>
        </select>
      </div>
    )
  );
}

