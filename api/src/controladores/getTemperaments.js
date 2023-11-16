const axios = require('axios');
const { Temperaments } = require('../db');
const getTemperaments = async (req, res) => {
  try {
    // Realizar una solicitud a la API para obtener las razas de perros
    const apiKey = process.env.API_KEY;
    const apiResponse = await axios.get('https://api.thedogapi.com/v1/breeds', {
      headers: {
        'x-api-key': apiKey,
      },
    });

    const apiBreeds = apiResponse.data;

    // Extraer los temperamentos de las razas de perros de la API y guardarlos en un Set
    const temperamentsSet = new Set();

    for (const apiBreed of apiBreeds) {
      const temperament = apiBreed.temperament;
      if (temperament) {
        const temperamentArray = temperament.split(', ').map(item => item.trim());
        temperamentArray.forEach(item => temperamentsSet.add(item));
      }
    }

    // Convertir el Set de temperamentos en un array
    const apiTemperaments = Array.from(temperamentsSet);

    // Guardar los temperamentos en la base de datos si no están allí
    for (const apiTemperament of apiTemperaments) {
      await Temperaments.findOrCreate({
        where: { name: apiTemperament },
      });
    }

    // Obtener los temperamentos desde la base de datos
    const dbTemperaments = await Temperaments.findAll({
      attributes: ['id', 'name'], // Solo incluir estos atributos en la respuesta
    });

    return res.status(200).json(dbTemperaments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Hubo un error al obtener los temperamentos.' });
  }
};

module.exports = {
  getTemperaments,
};
