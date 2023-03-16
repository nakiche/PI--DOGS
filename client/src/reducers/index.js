import{ GET_DOGS,GET_DOGS_ID,GET_DOGS_NAME,GET_TEMPERAMENTS,CREATE_DOG,DELETE_SEARCH,CURRENT_PAGE,NEX_PREV_PAGE} from "../actions/index.js";


const initialState = {
	dogs: [],
	dogById:[],
	dogByName:[],
	dogTemperaments:[],
	currentPage:1
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
		return{
			...state,
			dogByName:state.dogByName.filter(e=>e.id!==action.payload) 
		}
	}

	if(action.type===CURRENT_PAGE){
		return{
			...state,
			currentPage:action.payload
		}
	}

	if(action.type===NEX_PREV_PAGE){
		return{
			...state,
			currentPage:action.payload==='next'?state.currentPage+1:state.currentPage-1
		}
	}

	return {...state}
}

export default rootReducer;