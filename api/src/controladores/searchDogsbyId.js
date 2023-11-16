const axios = require('axios');
const { Dog, Temperaments } = require('../db');

const getDogById = async (req, res, next) => {
  const { idRaza } = req.params;

  // Verificar si idRaza es un número
  if (!isNaN(idRaza)) {
    try {
      // Buscar en la base de datos por ID y cargar los temperamentos asociados
      const dbResult = await Dog.findByPk(idRaza, {
        include: Temperaments,
      });
      
      if (dbResult) {
        const dog = dbResult.toJSON(); // Convertir instancia de Sequelize a objeto JSON
        console.log('dog:', dog); 
      
        // Mapear a través de los temperamentos y devolver solo el nombre de cada uno
        const temperaments = dog.temperaments.map(t => t.name);
      
        // Crear un nuevo objeto que incluya los nombres de los temperamentos
        const response = {
          id: dog.id,
          name: dog.name,
          image: dog.image && dog.image.url ? dog.image.url : null,
          height: dog.height,
          weight: dog.weight,
          lifespan: dog.lifespan,
          iscreated: dog.iscreated, // Agrega esta línea
          temperaments: temperaments,
        };
      
        return res.status(200).json(response);
      }
      
      // Realizar una solicitud a la nueva API para obtener todas las razas de perros
      const apiKey = process.env.API_KEY;
      const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds`, {
        headers: {
          'x-api-key': apiKey,
        },
      });

      if (apiResponse.data) {
        // Filtrar los resultados para obtener la raza específica por ID
        const breed = apiResponse.data.find(b => b.id == idRaza);

        if (breed) {
          // Combinar resultados de la API
          const combinedResult = {
            id: breed.id,
            name: breed.name,
            image: breed.image && breed.image.url ? breed.image.url : null,
            height: breed.height && breed.height.metric ? breed.height.metric : null,
            weight: breed.weight && breed.weight.metric ? breed.weight.metric : null,
            lifespan: breed.life_span,
            iscreated: breed.iscreated || false, // Agrega esta línea
            temperaments: breed.temperament ? breed.temperament.split(', ').map(item => item.trim()) : [],
          };

          return res.status(200).json(combinedResult);
        } else {
          return res.status(404).json({ message: 'No se encontró la raza con el ID especificado.' });
        }
      } else {
        return res.status(404).json({ message: 'No se encontró la raza con el ID especificado.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Hubo un error al obtener el detalle de la raza.' });
    }
  } else {
    // Si idRaza no es un número, pasa la solicitud al siguiente controlador (en este caso, el controlador siguiente sería searchDogByName)
    next();
  }
};

module.exports = {
  getDogById,
};
