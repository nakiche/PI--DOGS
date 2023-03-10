import{ GET_DOGS,GET_DOGS_ID,GET_DOGS_NAME,GET_TEMPERAMENTS,CREATE_DOG,SORT_BY_ORIGIN } from "../actions/index.js";


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
	if(action.type===CREATE_DOG){
		return{
			...state,
			dogs:action.payload //
		}
	}

	if(action.type===SORT_BY_ORIGIN){
		let originArr = state.dogs.filter(e=>e.fromApi===true)
		return{
			...state,
			dogs:originArr //
		}
	}
	return state;
}

export default rootReducer;