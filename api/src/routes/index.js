const { Router } = require('express');
const {Dog,Temperament}  = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

router.get('/dogs', async (req, res) => {
	try {
		const dogs = await Dog.findAll({})
		res.status(200).json(dogs);
	}catch(e)
	{
		res.status(400).json(e.message);
	}	
});

router.get('/dogs/:idRaza', async (req, res) => {
	try {
		let{idRaza}=req.params
		const dog = await Dog.findByPk(idRaza)
		 if(dog) {
			res.status(200).json(dog); 
		}else{
		res.status(400).json({error:'no existe el perro'});
		}

	}catch(e)
	{
		res.status(400).json(e.message);
	}	
});


router.post('/test/bulk', async (req, res) => {
	try {
		res.json(await Temperament.bulkCreate(req.body));
	}catch(e)
	{
		res.send(e.message);
	}	
});





router.use('/', (req, res) => {
  res.status(404).send('Resource not found');
});



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
