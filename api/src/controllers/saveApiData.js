const axios =require ('axios')
const {Dog,Temperament}  = require('../db.js');
//const { Character } = require('../models/Character');


var getApiData =  async function(){
	//return new Promise  function(resolve, reject){
      try {
        
        // let dogs = [] 
         let temperaments =[]
      
         let response= await axios(`https://api.thedogapi.com/v1/breeds`)
        // //dogs.push(response)
        // dogs = response.data.map(res=>{
        // return ({
        //  id:res.id,
        //  image:res.image.url,
        //  name:res.name,
        //  height:res.weight.metric,
        //  weight:res.height.metric,
        //  life_span:res.life_span
        //     })
        //  })

        //console.log(dogs)
        temperaments = response.data.map(res=>{
         //console.log(res.temperament)
        if (!res.temperament) {
         //console.log('ingreso a null')
         return ({
         id:res.id,
         name:['none'],
            })
         
        } else{
        return ({
         id:res.id,
         name:res.temperament.split(', ')
         

         //id:res.id,
      
         
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
         //dogs,
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
   //console.log(newArray.temperaments[144])

   for (let i=0 ; i < newArray.temperaments.length; i++){
        // console.log(newArray.temperaments[i].name)
         await Temperament.create({
         id:newArray.temperaments[i].id,
         name:newArray.temperaments[i].name,
         
      })
   }
   console.log("temperaments data have been saved")

   //await Temperament.bulkCreate(newArray.temperaments).then(() => console.log("temperaments data have been saved"))
   //await Dog.bulkCreate(newArray.dogs).then(() => console.log("dogs data have been saved"))   

   // for (let i=0 ; i < newArray.dogs.length; i++){
   //    let doggie = await Dog.create({
   //       id:newArray.dogs[i].id,
   //       image:newArray.dogs[i].image,
   //       name:newArray.dogs[i].name,
   //       height:newArray.dogs[i].weight,
   //       weight:newArray.dogs[i].height,
   //       life_span:newArray.dogs[i].life_span
   //    })

   //    let idTemperament = await Temperament.findByPk(newArray.dogs[i].id)
   //    //llenando la tabla intermedia
   //    await doggie.addTemperament(idTemperament.id)
   // }
   // console.log("dogs data have been saved")
   }catch(e){
      return {msg:e.message}
   }
}

module.exports = saveApiData;