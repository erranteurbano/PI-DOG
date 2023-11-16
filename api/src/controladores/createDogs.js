const { Dog, Temperaments } = require('../db');

let id = 264;

async function createDog(req,res){

  try {
   
    const {name,image,height,weight,lifespan,temperaments} = req.body;
    
    // Verificar si el perro ya existe en la base de datos
    const existingDog = await Dog.findOne({ where: { name } });
    if (existingDog) {
      return res.status(400).json({
        success: false,
        message: 'El perro ya existe en la base de datos',
      });
    }

    id++;

    const createdDog = await Dog.create({
      id:id,
      name,
      image,
      height,
      weight,
      lifespan,
      iscreated:true,
    });

    console.log(createdDog);

    // Verificar si los temperamentos están en la base de datos, si no, agregarlos
    const dbTemperaments = await Promise.all(temperaments.map(async tempName => {
      let dbTemp = await Temperaments.findOne({ where: { name: tempName } });
      if (!dbTemp) {
        dbTemp = await Temperaments.create({ name: tempName });
      }
      return dbTemp;
    }));

    // Relacionar los temperamentos con el perro
    await createdDog.setTemperaments(dbTemperaments.map(t => t.id));

    return res.status(201).json({
      success:true,
      message: 'Dog creado exitosamente',
      data: {
        ...createdDog.get(),
        temperaments: dbTemperaments,
      },
    });

  } catch (error) {
    console.error('Error al registrar la raza del perro:',error);
    return res.status(500).json({
      success: false,
      message: 'No se pudo registrar la raza del perro',
      error: error.message,
    });
  }
}

module.exports = {
  createDog
}






  