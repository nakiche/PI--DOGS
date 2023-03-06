import{ GET_DOGS } from "../actions/index.js";


const initialState = {
	dogs: [],
}


function rootReducer(state = initialState,action){
	if(action.type===GET_DOGS){
		return{
			...state,
			dogs:action.payload //.Search por que del Json en la propiedad que parsea lo que necesitamos
		}
	}


	return state;
}

export default rootReducer;