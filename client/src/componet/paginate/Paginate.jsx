import React from 'react';
import styles from '../../style/Paginate.module.css';
export default function Paginate({ numPage, cantPage, onPageChange }) {
  // Obtener el número total de páginas
  const totalPages = cantPage;

  // Función para manejar el botón "NEXT"
  const handleNext = () => {
    if (numPage < totalPages) {
      onPageChange(numPage + 1);
    }
  };

  // Función para manejar el botón "PREV"
  const handlePrev = () => {
    if (numPage > 1) {
      onPageChange(numPage - 1);
    }
  };

  // Calcular la primera página a mostrar
  const startPage = Math.max(1, Math.floor((numPage - 1) / 4) * 4 + 1);

  // Calcular la cantidad de páginas que se mostrarán (siempre 4)
  const pagesToShow = Math.min(totalPages - startPage + 1, 4);

  return (
    <div className={styles.container}>
      <button className={styles.pageButton} onClick={handlePrev}>
        PREV
      </button>
      <div className={styles.pageNumbersContainer}>
        {[...Array(pagesToShow)].map((_, index) => {
          const pageNumber = startPage + index;
          return (
            <div
              key={pageNumber}
              className={`${styles.pageNumber} ${numPage === pageNumber ? styles.active : ''}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </div>
          );
        })}
      </div>
      <button className={styles.pageButton} onClick={handleNext}>
        NEXT
      </button>
    </div>
  );
}