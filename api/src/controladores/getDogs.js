const axios = require('axios');
const { Dog, Temperaments } = require('../db');

const getDogBreeds = async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const response = await axios.get('https://api.thedogapi.com/v1/breeds', {
      headers: {
        'x-api-key': apiKey,
      },
    });

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('La respuesta de la API no contiene datos válidos.');
    }

    const breeds = response.data.map(breed => ({
      id: breed.id,
      name: breed.name,
      image: breed.image && breed.image.url ? breed.image.url : null,
      height: breed.height && breed.height.metric ? breed.height.metric : null,
      weight: breed.weight && breed.weight.metric ? breed.weight.metric : null,
      lifespan: breed.life_span,
      iscreated: breed.iscreated || false,
      temperaments: breed.temperament ? breed.temperament.split(', ').map(item => item.trim()) : [],
    }));

    // Buscar perros con iscreated como true en la base de datos
    const createdDogs = await Dog.findAll({
      where: { iscreated: true },
      include: {
        model: Temperaments,
        attributes: ['name'],
      }
    });

    // Mapear los temperamentos a sus nombres y agregar los perros creados al array de razas
    createdDogs.forEach(dog => {
      dog.dataValues.temperaments = dog.temperaments.map(temperament => temperament.name);
      breeds.push(dog.dataValues);
    });

    return res.status(200).json(breeds);
  } catch (error) {
    console.error(error);

    if (error.code === 'ECONNABORTED') {
      return res.status(500).json({ message: 'La solicitud a la API ha expirado debido a la lenta conexión.' });
    }

    if (error.response) {
      // Manejo de errores específicos de la respuesta (por ejemplo, error de autenticación)
      return res.status(error.response.status).json({ message: error.response.data.message });
    }

    return res.status(500).json({ message: 'Hubo un error al obtener las razas de perros.' });
  }
};


module.exports = {
  getDogBreeds,
};

