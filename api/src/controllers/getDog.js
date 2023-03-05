const axios =require ('axios')
const {Dog,Temperament,Op}  = require('../db.js');

var getDog =  async function(){

	try {
         //let i =1;
         let dogsApi = [] 
         let dogsDb = []
     
        let response= await axios(`https://api.thedogapi.com/v1/breeds`)
        //dogs.push(response)
        dogsApi = response.data.map(res=>{
        return ({
         id:res.id,
         image:res.image.url,
         name:res.name,
         height:res.weight.metric,
         weight:res.height.metric,
         life_span:res.life_span,
         Temperaments: res.temperament ? [{name:res.temperament.split(', ')}] : [{name:'none'}]
            })
         })

        dogsDb = await Dog.findAll({
							//where: {id: {[Op.eq]: id}},
							include: {model: Temperament,
							attributes: ['name'],
							through: {
				        		attributes: []
				      				}
								}
							})

        return dogsApi.concat(dogsDb)

      }catch(e)
      {
         return {msg:e.message}
      }

}

module.exports = getDog;