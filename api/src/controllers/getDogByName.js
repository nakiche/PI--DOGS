const axios =require ('axios')
const {Dog,Temperament,Op}  = require('../db.js');

var getDogByName =  async function(dogName){
	
      try {
         let dogsApi = [] 
         let dogsDb = []

        let response= await axios(`https://api.thedogapi.com/v1/breeds/search?q=${dogName}`)
  
        dogsApi = response.data.map(res=>{
      let weightArray=(res.weight.metric).split(" - ")
        return ({
         id:res.id,
         image:res.reference_image_id ? `https://cdn2.thedogapi.com/images/${res.reference_image_id}.jpg` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png' ,
         name:res.name,
         min_weight:isNaN(parseInt(weightArray[0])) ? 0 : parseInt(weightArray[0]),
         max_weight:isNaN(parseInt(weightArray[1])) ? 0 : parseInt(weightArray[1]),
         height:res.height.metric,
         life_span:res.life_span,
         Temperaments: res.temperament ? [{name:res.temperament.split(', ')}] : [{name:'none'}],
         fromApi: true
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