import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';
export const GET_DOGS_ID = 'GET_DOGS_ID';
export const GET_DOGS_NAME = 'GET_DOGS_NAME';

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