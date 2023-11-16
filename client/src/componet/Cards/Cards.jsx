import React, { useEffect, useState } from 'react';
import Card from './Card';
import style from '../../style/Cards.module.css';
import Paginate from '../paginate/Paginate';

export default function Cards({ Dogs }) {
  const cantDogsPage = 8;

  const [currentPage, setCurrentPage] = useState(1);
  const [currentDogs, setCurrentDogs] = useState([]);

  useEffect(() => {
    setCurrentPage(1);
    const dogsArray = Array.isArray(Dogs) ? Dogs : [Dogs];
    setCurrentDogs(dogsArray.slice(0, cantDogsPage));
  }, [Dogs]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    if (Array.isArray(Dogs)) {
      const startIndex = (pageNumber - 1) * cantDogsPage;
      const endIndex = pageNumber * cantDogsPage;

      setCurrentDogs(Dogs.slice(startIndex, endIndex));
    }
  };

  console.log('currentDogs:', currentDogs);

  const totalDogPages = Math.ceil((Array.isArray(Dogs) ? Dogs.length : 1) / cantDogsPage);

  return (
    <div>
      <div className={style.principal}>
        {currentDogs && currentDogs.map((dog) => (
          <Card
            key={`${dog.id}-${dog.name}`}
            id={dog.id}
            name={dog.name}
            image={dog.image}
            weight={dog.weight}
            temperaments={dog.temperaments}
          />
        ))}
      </div>
      <Paginate
        numPage={currentPage}
        cantPage={totalDogPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}


