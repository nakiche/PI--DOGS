const { Router } = require('express');
const { QueryTypes } = require('sequelize');
const {Dog,Temperament,Op,conn}  = require('../db.js');
const getDog = require ('../controllers/getDog.js');
const getDogByName = require ('../controllers/getDogByName.js');
const postDog = require ('../controllers/postDog.js');

const router = Router();

let dogs =[]

router.get('/dogs/name', async (req, res) => {
	let {name} = req.query;
	try {
		let dog = await getDogByName(name) 
		if (dog.length>0){
			res.status(200).json(dog);
		}else{
			res.status(400).json({error:'no existe el perro indicado'});
		}
	}catch(e)
	{
		res.status(400).json(e.message);
	}	
});

router.get('/dogs', async (req, res) => {
	try {
		dogs = await getDog()
		res.status(200).json(dogs);
	}catch(e)
	{
		res.status(400).json(e.message);
	}	
});

router.get('/dogs/:idRaza', async (req, res) => {
	try {
		let{idRaza}=req.params
		let dog = await getDog()
		let newArray =dog.filter(c=>c.id==idRaza)
		if(newArray.length>0) {
			res.status(200).json(dog.filter(c=>c.id==idRaza)); 
		}else{
			res.status(400).json({error:'no existe el perro'});
		}

	}catch(e)
	{
		res.status(400).json(e.message);
	}	
});

router.get('/temperaments/unnest', async (req, res) => {
	try {
		// Use raw SQL queries to unnest the object
		const temperaments = await conn.query(`SELECT DISTINCT name (unnest(name)) as name FROM "Temperaments"  WHERE NOT 'none' =ANY(name) ORDER BY name`,
		{
			type: QueryTypes.SELECT
		})
		res.status(200).json(temperaments);
	}catch(e)
	{
		res.status(400).json(e.message);
	}	
});

router.get('/temperaments', async (req, res) => {
	try {
		const temperaments = await Temperament.findAll({})
		res.status(200).json(temperaments);
	}catch(e)
	{
		res.status(400).json(e.message);
	}	
});

router.post('/dogs', async (req, res) => {
  try {
		res.status(200).json(await postDog(req.body));
	}catch(e){
		res.status(400).json(e.message);
	}	
});

router.use('/', (req, res) => {
  res.status(404).send('Resource not found');
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
