import React  from "react";
import './App.css';
import Nav from "./components/navbar/Nav.jsx";
import Detail from "./components/detail/Detail.jsx";
import Form from "./components/form/Form.jsx";
import Welcome from "./components/welcome/Welcome.jsx";
import Dogs from "./components/dogs/Dogs.jsx";
import { Route, HashRouter as Router,  useHistory,useLocation } from 'react-router-dom';
//import {dogs} from "./ExampledB.js"
import {getDogsByName,createDog,getTemperaments,getDogs,deleteSearch}  from '../src/actions/index.js';
import { useDispatch,useSelector } from 'react-redux'

function App() {  
const dispatch = useDispatch();
const history = useHistory()
const location = useLocation()

const dogDetailByName  = useSelector((state) =>state.dogByName);
const dogTemperaments  = useSelector((state) =>state.dogTemperaments);
const doggies  = useSelector((state) =>state.dogs);

let onSearch = async (name)=>{
  name = name.trim()
  if (!name) {
    window.alert('Please enter a dog name')
    return
  }
    try{
      await dispatch(getDogsByName(name));
    }catch(e)
    {
      window.alert(`No dogs found with the name "${name}"`)
    }
}  

let handleSubmit = async(dogData) =>{
  console.log(dogData)
   if (!dogData.name || !dogData.min_life_span || !dogData.max_life_span 
    || !dogData.min_height || !dogData.max_height || !dogData.min_weight 
    || !dogData.max_weight | !dogData.temperament ) {
    window.alert('All values are required ')
    return
  }
   try{
   let response =await dispatch(createDog(dogData))
   window.alert(`Breed: ${dogData.name}, was succesfully created`)
   }catch(e)
   {
    window.alert(e)
   }
}

 let onClose =  (id)=>{
     dispatch(deleteSearch(id))
   }  

React.useEffect(() => {
      async function fetchData() {
       // You can await here
       await dispatch(getTemperaments()); //temperaments
       await dispatch(getDogs()); //dogs
   }
   fetchData();
   },[]);

  return (
  <div className='App'>
   <Router>
    <div>{ location.hash !== '#/' && 
      <Nav onSearch={onSearch} dogDetailByName={dogDetailByName} onClose={onClose}  />
          } 
    </div>   
      <Route exact path="/">
       <Welcome  />
      </Route>
      <Route exact path="/home">
         <hr />
          <Dogs dogTemperaments={dogTemperaments} doggies={doggies} />
      </Route>
      <Route path="/detail/:id">
        <hr />
        <Detail />
      </Route>
      <Route path="/form">
        <hr />
        <Form handleSubmit={handleSubmit}/>
      </Route>
    </Router>
  </div>
  );
}

export default App;
