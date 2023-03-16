import React  from "react";
import './App.css';
import styled from 'styled-components';
import Nav from "./components/navbar/Nav.jsx";
import Detail from "./components/detail/Detail.jsx";
import Form from "./components/form/Form.jsx";
import Welcome from "./components/welcome/Welcome.jsx";
import Dogs from "./components/dogs/Dogs.jsx";
import { Route, HashRouter as Router,useLocation } from 'react-router-dom';
import {getDogsByName,createDog,getTemperaments,getDogs,deleteSearch}  from '../src/actions/index.js';
import { useDispatch,useSelector } from 'react-redux'

const DivError = styled.div`
border-radius:5px;
   display:inline-block;
   background-color:#F5293A;
   width:auto;
   margin-top :5px;
   color: white;
   font-size:1rem;
`;

const DivSuccess = styled.div`
   border-radius:5px;
   display:inline-block;
   background-color:#8EC773;
   width:auto;
   margin-top :5px;
   color: white;
   font-size:1rem;
`;


function App() {  
const dispatch = useDispatch();
const location = useLocation()

const dogDetailByName  = useSelector((state) =>state.dogByName);
const dogTemperaments  = useSelector((state) =>state.dogTemperaments);
const doggies  = useSelector((state) =>state.dogs);
let doggiess = doggies  

const [errors, setErrors] = React.useState('')
const [success, setSuccess] = React.useState('')

let cleanState=()=>{
  setErrors('')
  setSuccess('')
}


let onSearch = async (name)=>{
  name = name.trim()
  if (!name) {
    setErrors("Please enter breed's name")
    setTimeout(cleanState, 3000);
    return
  }
    try{
      await dispatch(getDogsByName(name));
    }catch(e)
    {
      setErrors(`No dogs found with the name "${name}"`)
      setTimeout(cleanState, 3000);
    }
}  

let validateName = (name) =>{
   let nameCapitalized = name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);

   if (doggies.some(e => e.name.toLowerCase() === name.toLowerCase())) {
    setErrors(`The breed "${nameCapitalized}" already exists in the database`)
    setTimeout(cleanState, 3000);
    return true
   } 
   
   return  false
}

let handleSubmit = async(dogData) =>{

   if (!dogData.name || !dogData.min_life_span || !dogData.max_life_span 
    || !dogData.min_height || !dogData.max_height || !dogData.min_weight 
    || !dogData.max_weight | !dogData.temperament ) {
    setErrors(`All values are required`)
    setTimeout(cleanState, 3000);
    return
  }
    if (validateName(dogData.name)) return  

   try{
   await dispatch(createDog(dogData))
   setSuccess(`Breed: ${dogData.name}, was succesfully created`)
   setTimeout(cleanState, 3000);
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
          {errors && <DivError >{errors}</DivError>}   
          {success && <DivSuccess>{success}</DivSuccess>}
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
        <Form handleSubmit={handleSubmit} validateName={validateName}/>
      </Route>
    </Router>
  </div>
  );
}

export default App;
