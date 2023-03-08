import{ GET_DOGS,GET_DOGS_ID,GET_DOGS_NAME,GET_TEMPERAMENTS } from "../actions/index.js";


const initialState = {
	dogs: [],
	dogById:[],
	dogByName:[],
	dogTemperaments:[]
}


function rootReducer(state = initialState,action){
	if(action.type===GET_DOGS){
		return{
			...state,
			dogs:action.payload //
		}
	}
	if(action.type===GET_DOGS_ID){
		return{
			...state,
			dogById:action.payload //
		}
	}
	if(action.type===GET_DOGS_NAME){
		return{
			...state,
			dogByName:action.payload //
		}
	}
	if(action.type===GET_TEMPERAMENTS){
		return{
			...state,
			dogTemperaments:action.payload //
		}
	}
	return state;
}

export default rootReducer;