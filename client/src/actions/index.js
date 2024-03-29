import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';
export const GET_DOGS_ID = 'GET_DOGS_ID';
export const GET_DOGS_NAME = 'GET_DOGS_NAME';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const CREATE_DOG = 'CREATE_DOG';
export const DELETE_SEARCH = 'DELETE_SEARCH'
export const CURRENT_PAGE = 'CURRENT_PAGE'
export const NEX_PREV_PAGE = 'NEX_PREV_PAGE'

//inicializamos en 999 para que los perros creados tengan
//id mayor a 1000
let id = 999;

export const getDogs  = () => {
  console.log('GET_DOGS')
    // Completa la funcion
    return async (dispatch)=>{
    	
      let response = await axios.get(`http://localhost:3001/dogs`);
      let data = response.data;
      
    return dispatch({
      type:GET_DOGS,
      payload:data
    })
  }
};

export const getDogsById  = (id) => {
  console.log('GET_DOGS_ID')
    // Completa la funcion
    return async (dispatch)=>{
      
      let response = await axios.get(`http://localhost:3001/dogs/${id}`);
      let data = response.data;
   
    return dispatch({
      type:GET_DOGS_ID,
      payload:data
    })
  }
};

export const getDogsByName  = (name) => {
  console.log('GET_DOGS_NAME')
    // Completa la funcion
    return async (dispatch)=>{
      
      let response = await axios.get(`http://localhost:3001/dogs/name?name=${name}`);
      let data = response.data;
   
    return dispatch({
      type:GET_DOGS_NAME,
      payload:data
    })
  }
};

export const getTemperaments  = () => {
  console.log('GET_TEMPERAMENTS')
    // Completa la funcion
    return async (dispatch)=>{
      
      let response = await axios.get(`http://localhost:3001/temperaments/unnest`);
      let data = response.data;
   
    return dispatch({
      type:GET_TEMPERAMENTS,
      payload:data.map((e)=>e.name)
    })
  }
};


export const createDog  = (dogData) => {
  console.log('CREATE_DOG')
  id++
    let objeto ={"id": id,
                "image": "no_image",
                "name": dogData.name,
                "min_height": parseInt(dogData.min_height),
                "max_height": parseInt(dogData.max_height),
                "min_weight": parseInt(dogData.min_weight),
                "max_weight": parseInt(dogData.max_weight),
                "min_life_span": parseInt(dogData.min_life_span),
                "max_life_span": parseInt(dogData.max_life_span),
                "temperament":dogData.temperament,
    }
   
    // Completa la funcion
    return async (dispatch)=>{
      
      let response = await axios.post(`http://localhost:3001/dogs`,objeto);
      let data = response.data;
      
    return dispatch({
      type:CREATE_DOG,
      payload:data
    })
  }
};

export const deleteSearch = (id) => {
   console.log('DELETE_SEARCH')
  // Completa la funcion
    return ({
      type:DELETE_SEARCH,
      payload:id
    })
}
 export const getCurrentPage = (page) => {
   console.log('CURRENT_PAGE')
  // Completa la funcion
    return ({
      type:CURRENT_PAGE,
      payload:page
    })   
}

export const nextPrevPag = (action) => {
   console.log('NEX_PREV_PAGE')
  // Completa la funcion
    return ({
      type:NEX_PREV_PAGE,
      payload:action
    })   
}