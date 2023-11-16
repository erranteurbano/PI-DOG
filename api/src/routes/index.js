const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getDogBreeds } = require('../controladores/getDogs');
const {getDogById} = require('../controladores/searchDogsbyId');
const {searchDogByName} = require('../controladores/searchDogsbyName');
const {getTemperaments}= require('../controladores/getTemperaments');
const {createDog} = require('../controladores/createDogs')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs',getDogBreeds );
router.post('/dogs',createDog);
router.get('/dogs/:idRaza', getDogById);
router.get('/dogs/name', searchDogByName);
router.get('/temperaments', getTemperaments);




module.exports = router;
