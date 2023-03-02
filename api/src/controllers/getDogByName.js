const axios =require ('axios')

var getDogByName =  async function(dogName){
	
      try {
         let dogs = [] 
        let response= await axios(`https://api.thedogapi.com/v1/breeds/search?q=${dogName}`)
  
        dogs = response.data.map(res=>{
        return ({
         id:res.id,
         image:res.reference_image_id ? `https://cdn2.thedogapi.com/images/${res.reference_image_id}.jpg` : 'no_image' ,
         name:res.name,
         height:res.weight.metric,
         weight:res.height.metric,
         life_span:res.life_span
            })
         })
  	
        return dogs
        
      }catch(e)
      {
         return {msg:e.message}
      }
}

module.exports = getDogByName;