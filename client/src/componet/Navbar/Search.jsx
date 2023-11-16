import React from 'react';
import { useDispatch } from 'react-redux';
import { resetPage, findDogs } from '../../redux/actions/actions';
import style from '../../style/Navbar.module.css';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

export default function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Inicializa useNavigate
  const [params, setParams] = React.useState('');
  const [error, setError] = React.useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setParams(value);

    // Valida en tiempo real
    if (!value.trim()) {
      setError('El campo de búsqueda está vacío');
    } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
      setError('Caracteres especiales no están permitidos');
    } else {
      setError('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      add();
    }
  };

  const add = () => {
    if (!params.trim() || error) {
      // No ejecutes la búsqueda si hay errores
      return;
    }

    const formattedQuery = /^\d+$/.test(params) ? parseInt(params, 10) : params;

    dispatch(findDogs(formattedQuery));
    setParams('');
    setError('');
    dispatch(resetPage());

    // Redirige a la página de inicio después de la búsqueda
    navigate('/dogs/home');
  };

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <input
          type="search"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={params}
          name="params"
          placeholder="Buscar ..."
        />
        <button className={style.btn} onClick={add} disabled={!!error}>
          Buscar
        </button>
        {error && (
          <p style={{ position: 'absolute', bottom: '-40px', color: 'red' }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

