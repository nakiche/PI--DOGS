const axios =require ('axios')
const {Dog,Temperament,Op}  = require('../db.js');

var getDogByName =  async function(dogName){
	
      try {
         let dogsApi = [] 
         let dogsDb = []

        let response= await axios(`https://api.thedogapi.com/v1/breeds/search?q=${dogName}`)
  
        dogsApi = response.data.map(res=>{
        return ({
         id:res.id,
         image:res.reference_image_id ? `https://cdn2.thedogapi.com/images/${res.reference_image_id}.jpg` : 'no_image' ,
         name:res.name,
         height:res.weight.metric,
         weight:res.height.metric,
         life_span:res.life_span,
         Temperaments: res.temperament ? [{name:res.temperament.split(', ')}] : [{name:'none'}]
            })
         })

        dogsDb = await Dog.findAll({
							where: {
								name: {
									[Op.iLike]: `%${dogName}%`,
									  }
									},
							include: {model: Temperament,
							attributes: ['name'],
							through: {
				        		attributes: []
				      				}
								}
							})
  	
        return dogsApi.concat(dogsDb)
        
      }catch(e){
         return {msg:e.message}
      }
}

module.exports = getDogByName;