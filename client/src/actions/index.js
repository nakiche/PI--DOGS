import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';

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
