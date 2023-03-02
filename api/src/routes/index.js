const { Router } = require('express');
const {Dog,Temperament,Op}  = require('../db.js');
const getDogByName = require ('../controllers/getDogByName.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get('/dogs/perro', async (req, res) => {
	//res.status(200).json('hola');
	console.log(req.query)
	// console.log('hola')
	let {name} = req.query;
	try {
		let dog = await getDogByName(name) 
		if (dog.length>0){
			res.status(200).json(dog);
		}else{
			res.status(400).json({error:'no existe el perro'});
		}
		
	}catch(e)
	{
		res.status(400).json(e.message);
	}	
});


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
		const dog = await Dog.findAll({
			where: {id: {[Op.eq]: idRaza}},
			include: {model: Temperament,
			attributes: ['name'],
			through: {
        		attributes: []
      			}
			}
			
		})
		if(dog.length>0) {
			res.status(200).json(dog[0]); 
		}else{
			res.status(400).json({error:'no existe el perro'});
		}

	}catch(e)

	{
		res.status(400).json(e.message);
	}	
});


// router.post('/test/bulk', async (req, res) => {
// 	try {
// 		res.json(await Temperament.bulkCreate(req.body));
// 	}catch(e)
// 	{
// 		res.send(e.message);
// 	}	
// });

router.get('/temperaments', async (req, res) => {
	try {
		const temperaments = await Temperament.findAll({})
		res.status(200).json(temperaments);
	}catch(e)
	{
		res.status(400).json(e.message);
	}	
});

router.get('/dogs', async (req, res) => {
	//res.status(200).json('hola');
	console.log(req.query)
	console.log('hola')
	//let {name} = req.query;
// 	try {
		
// 		res.status(200).json(getDogByName(name));
// 	}catch(e)
// 	{
// 		res.status(400).json(e.message);
// 	}	
});



router.use('/', (req, res) => {
  res.status(404).send('Resource not found');
});



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
