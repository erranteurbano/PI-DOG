import React from 'react'
import style from '../../style/Cards.module.css';
import { Link } from 'react-router-dom';

export default function Card(props) {

  const { id, name, image,height,weight,lifespan,temperaments } = props;

  const adjustImageSize = (image) => {
    if (!image) {
      return null; // Retorna null si la imagen es undefined o null
    }

    const containerHeight = 300; // Altura máxima deseada para el contenedor de imágenes

    if (image.height > containerHeight) {
      // Calcular la nueva altura proporcionalmente al ancho original
      const newHeight = (containerHeight / image.height) * image.width;
      return {
        ...image,
        height: containerHeight,
        width: newHeight,
        className: style.largeImage, // Agregar la clase CSS para imágenes grandes
      };
    }

    return {
      ...image,
      className: style.extraSmallImage, // Agregar la clase CSS para imágenes adicionales
    };
  };

  const adjustedImage = adjustImageSize(image);
  const cardClassName = name ? `${style.card} ${style.withName}` : style.card;


  return (
    <Link className={style.Link} to={`/dogs/detail/${id}`}>
       <div className={style.container}>
        <div className={cardClassName} data-name={name}>
        <div className={style.imgBx}>
          {image && <img 
           src={image}
           alt={name}
           style={{
              width: `${adjustedImage.width}px`,
              height: `${adjustedImage.height}px`,
            }}
            className={adjustedImage.className}
          />}
        </div>
        <div className={style.id}>{id && <h3>{id}</h3>}</div>
         <div className={style.contenBX}>
           <div className={style.property}>
           {height && <span>{height}</span>}
            {weight && <span>Peso: {weight}</span>}
           {lifespan && <span>{lifespan}</span>}
          </div>
           <div className={style.tempContainer}>
             {temperaments && temperaments.map((t)=>(
                <span key={t} className={style.typeButton}>{t}</span>
             ))}
           </div>
         </div>
        </div>
       </div>
    </Link>
  )
}