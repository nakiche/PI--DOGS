import{ GET_DOGS,GET_DOGS_ID,GET_DOGS_NAME,GET_TEMPERAMENTS,CREATE_DOG,DELETE_SEARCH} from "../actions/index.js";


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

	if(action.type===DELETE_SEARCH){
		// console.log(action.payload)
		// let indice= state.dogByName.findIndex(e=>e.id===action.payload)
		// console.log(indice)
		return{
			...state,
			//dogByName:state.dogByName.splice(1,1) 
			dogByName:state.dogByName.filter(e=>e.id!==action.payload) 
		}
	}

	return {...state}
}

export default rootReducer;