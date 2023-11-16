import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogsDetail } from '../redux/actions/actions';
import { useParams } from 'react-router-dom';
import style from '../style/Details.module.css';

export default function Details() {
  
  const[carga,SetCarga] = React.useState(true);
  const {id}= useParams();
  const dispatch = useDispatch();

  React.useEffect(()=>{
    dispatch(getDogsDetail(id)).then(()=> SetCarga(false));
  })
    
  const detail = useSelector((state)=>state.detail);

  if(!carga && detail) {
    return (
      <div className={`${style.container} ${style.flex}`}>
        <div className={style.left}>
          <div className={style.main_image}>
              {detail.image && <img className={`${style.dogs_image}`} src={detail.image} alt={detail.name} />}
            </div>
        </div>
           <div className={style.rigth}>
              <div className={`${style.dog_detail}`}>
                {id && <p  className={style.dogs_stats}> Id: {id}</p>}
                {detail.name && <p className={style.dogs_stats}> Nombre: {detail.name}</p>}
                {detail.height && <p className={style.dogs_stats}>Altura: {detail.height} M</p>}
                {detail.weight && <p className={style.dogs_stats}>peso: {detail.weight} kg</p>}
                {detail.lifespan && <p className={style.dogs_stats}>años de vida : {detail.lifespan}</p>}
            </div>
                <div className={style.tempContainer}>
                {detail.temperaments && detail.temperaments.map((t) => (
                  <span
                    key={t}
                    className={style.tempButton} 
                  >
                    {t}
                  </span>
                ))}
              </div>
           </div>
      </div>
    )
  }
  else {
    return (
      <div className={style.cargando}>
        <p>Cargando...</p>
      </div>
    );
  }
}
