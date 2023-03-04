const axios =require ('axios')

var getDog =  async function(){

	try {
         //let i =1;
         let dogs = [] 
         
     
        let response= await axios(`https://api.thedogapi.com/v1/breeds`)
        //dogs.push(response)
        dogs = response.data.map(res=>{
        return ({
         id:res.id,
         image:res.image.url,
         name:res.name,
         height:res.weight.metric,
         weight:res.height.metric,
         life_span:res.life_span,
         temperament: res.temperament ? res.temperament.split(', ') : 'none'
            })
         })
        return dogs

      }catch(e)
      {
         return {msg:e.message}
      }

}

module.exports = getDog;