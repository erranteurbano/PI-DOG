const axios = require('axios');
const { Sequelize } = require('sequelize');
const { Dog } = require('../db');

const searchDogByName = async (req, res) => {
  const { name } = req.query;

  // Convertir el nombre a minúsculas para hacer la búsqueda sin distinción de mayúsculas o minúsculas
  const lowercaseName = name.toLowerCase();

  try {
    // Buscar en la base de datos
    const dbResults = await Dog.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${lowercaseName}%`,
        },
      },
    });

    //console.log(dbResults);

    // Buscar en la API
const apiKey = process.env.API_KEY;
const response = await axios.get('https://api.thedogapi.com/v1/breeds', {
  headers: {
    'x-api-key': apiKey,
  },
});

const apiResults = response.data.filter(breed => breed.name.toLowerCase().includes(lowercaseName));

// Combinar resultados de la base de datos y la API
let combinedResults = [...dbResults];

apiResults.forEach(apiBreed => {
  const dbBreedIndex = combinedResults.findIndex(dbBreed => dbBreed.id === apiBreed.id);
  
  if (dbBreedIndex !== -1) {
    // Fusionar los dos objetos
    combinedResults[dbBreedIndex] = { ...apiBreed, ...combinedResults[dbBreedIndex] };
  } else {
    combinedResults.push(apiBreed);
  }
});



    //console.log(combinedResults);

    // Eliminar duplicados
    const uniqueResults = Array.from(new Set(combinedResults.map(breed => breed.id))).map(id => {
      return combinedResults.find(breed => breed.id === id);
    });

    //console.log(uniqueResults);
    
// Formatear la información para cada objeto en el resultado
const formattedResults = uniqueResults.map(breed => {
  // Encontrar el objeto correspondiente en dbResults
  const dbBreed = dbResults.find(dbBreed => dbBreed.id === breed.id);

  return {
    id: breed.id,
    name: breed.name,
    image: breed.image && breed.image.url ? breed.image.url : null,
    height: breed.height && breed.height.metric ? breed.height.metric : null,
    weight: breed.weight && breed.weight.metric ? breed.weight.metric : null,
    lifespan: breed.life_span,
    iscreated: dbBreed ? dbBreed.iscreated : false, // Usar el valor de iscreated de dbBreed si existe
    temperaments: breed.temperament ? breed.temperament.split(', ').map(item => item.trim()) : [],
  };
});


    
    console.log(formattedResults); 

    if (formattedResults.length === 0) {
      return res.status(404).json({ message: 'No se encontraron razas de perros con ese nombre.' });
    } 

    return res.status(200).json(formattedResults);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un error al buscar razas de perros.' });
  }
};

module.exports = {
  searchDogByName,
};


