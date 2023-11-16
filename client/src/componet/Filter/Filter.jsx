import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, getTemperaments, addFilter } from '../../redux/actions/actions';
import IsCreatedFilter from './IsCreatedFilter';
import Ordenar from '../Ordenar/Ordenar';
import style from '../../style/Filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  React.useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === 'all') {
      // Si se selecciona "Todos", elimina el filtro de temperamento
      dispatch(getAllDogs());
    } else {
      // Si se selecciona un temperamento, agrega el filtro correspondiente
      dispatch(addFilter(selectedValue));
    }
  };

  return (
    <div className={style.filter_container}>
      <IsCreatedFilter />
      <label htmlFor="temperamentSelect">Seleccionar temperamento:</label>
      <select
        id="temperamentSelect"
        onChange={handleSelectChange}
        defaultValue="all"
      >
        <option value="all">Todos</option>
        {temperaments &&
          temperaments.map((temp) => (
            <option key={temp.id} value={temp.name}>
              {temp.name}
            </option>
          ))}
      </select>
      <Ordenar/>
    </div>
  );
}
