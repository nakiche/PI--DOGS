const axios =require ('axios')
const {Dog,Temperament}  = require('../db.js');

var getApiData =  async function(){
	//return new Promise  function(resolve, reject){
      try {
        // let dogs = [] 
         let temperaments =[]
      
         let response= await axios(`https://api.thedogapi.com/v1/breeds`)
       
        temperaments = response.data.map(res=>{
       
        if (!res.temperament) {
         return ({
         id:res.id,
         name:['none'],
            })
         
        } else{
        return ({
         id:res.id,
         name:res.temperament.split(', ')
                })
        }
         })

       
        return {
         temperaments
         } 
      }catch(e){
         return {msg:e.message}
      }
}

var saveApiData  =  async function(){
  
   try{
   let newArray = await getApiData() 
  
   for (let i=0 ; i < newArray.temperaments.length; i++){
        
         await Temperament.create({
         id:newArray.temperaments[i].id,
         name:newArray.temperaments[i].name,
         
      })
   }

   }catch(e){
      return {msg:e.message}
   }
}

module.exports = saveApiData;