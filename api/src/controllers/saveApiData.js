const axios =require ('axios')
const {Dog,Temperament}  = require('../db.js');
//const { Character } = require('../models/Character');


var getApiData =  async function(){
	//return new Promise  function(resolve, reject){
      try {
         //let i =1;
         let dogs = [] 
         let temperaments =[]
       //while(i<6){
        let response= await axios(`https://api.thedogapi.com/v1/breeds`)
        //dogs.push(response)
        dogs = response.data.map(res=>{
        return ({
         id:res.id,
         image:res.image.url,
         name:res.name,
         height:res.weight.metric,
         weight:res.height.metric,
         life_span:res.life_span
            })
         })

        //console.log(dogs)
        temperaments = response.data.map(res=>{
        if (!res.temperament) {
         //console.log('ingreso a null')
         return ({
         id:res.id,
         name:'n/a',
            })
         
        } else{
        return ({
         id:res.id,
         name:res.temperament,
            })
        }
         })

        //i++;
        //}                                                       //results es donde se almacena lo que quiero mapear                                                               //data porque axios trae en el objeto data
        // characters = (await Promise.all(characters)).map(res=>res.data.results.map(char=>{
        // return ({
        //     id: char.id,
        //     name: char.name,
        //     status: char.status,
        //     species: char.species,
        //     gender: char.gender,
        //     origin: char.origin.name,
        //     image: char.image
        //     })
        // }))
        // let allCharacters =[]
        // characters.map(char=>{allCharacters = allCharacters.concat(char)})
         //await Dog.bulkCreate(dogs).then(() => console.log("dogs data have been saved"))
        return {
         dogs,
         temperaments
         } 
      }catch(e)
      {
         return {msg:e.message}
      }
}

var saveApiData  =  async function(){
  
   try{
   let newArray = await getApiData() 
   await Dog.bulkCreate(newArray.dogs).then(() => console.log("dogs data have been saved"))
   await Temperament.bulkCreate(newArray.temperaments).then(() => console.log("temperaments data have been saved"))
   
   }catch(e){
      return {msg:e.message}
   }
}

module.exports = saveApiData;