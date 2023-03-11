const {Dog,Temperament,Op}  = require('../db.js');

var postDog =  async function({id,name,image,min_height,max_height,
		min_weight,max_weight,min_life_span,
 		max_life_span,temperament
 	}){

	if (!id || !name || !image || !min_height || !max_height 
 	|| !min_weight || !max_weight || !min_life_span 
 	|| !max_life_span || !temperament || temperament.length < 1 ) {
 		
	throw new Error ('Faltan datos')
 	}else{
	try{
		let dog = await  Dog.create({
        "id": id,
        "image": 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png',
        "name": name,
        "min_weight": min_weight,
        "max_weight":max_weight,
        "height": `${min_height} - ${max_height}`,
        "life_span": `${min_life_span} - ${max_life_span}`,   		
      })
		let DogTemperament = await Temperament.create({
        "id": id,
        "name": temperament
      })
		//llenando la tabla intermedia
		await dog.addTemperament(id)
		let dogTemperament = await Dog.findAll({
							where: {id: {[Op.eq]: id}},
							include: {model: Temperament,
							attributes: ['name'],
							through: {
				        		attributes: []
				      				}
								}
							})
		return `Breed: ${name}, was succesfully created` 
		}catch(e){
		return {msg:e.message}
	}
 }	
}
module.exports = postDog; 