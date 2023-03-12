import React  from "react";
import './App.css';
import Nav from "./components/navbar/Nav.jsx";
import Detail from "./components/detail/Detail.jsx";
import Form from "./components/form/Form.jsx";
import Welcome from "./components/welcome/Welcome.jsx";
import Dogs from "./components/dogs/Dogs.jsx";
import { Route, HashRouter as Router } from 'react-router-dom';
//import {dogs} from "./ExampledB.js"
import {getDogsByName,createDog,getTemperaments,getDogs,deleteSearch}  from '../src/actions/index.js';
import { useDispatch,useSelector } from 'react-redux'


function App() {  
const dispatch = useDispatch();

const dogDetailByName  = useSelector((state) =>state.dogByName);
const dogTemperaments  = useSelector((state) =>state.dogTemperaments);
const doggies  = useSelector((state) =>state.dogs);

let onSearch = async (name)=>{
    try{
      await dispatch(getDogsByName(name));
    }catch(e)
    {
      window.alert(e)
    }
}  

let handleSubmit = async(dogData) =>{
  //dispachar la accion de REDUX 
   try{
   let response =await dispatch(createDog(dogData))
   window.alert(response.payload)
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
       //let response =

       // setDogs({
       //   ...dogs,
       //   dogs:response.payload
       //   })
       await dispatch(getDogs()); //dogs
      
   }
   fetchData();
   },[]);


  return (
    <div className='App'>
     {/*{console.log(location.pathname)}*/}
    {/*<div>{ location.pathname ===! '/' && 
      <Nav />
          } 
    </div>   */}
    {/*configurar el componente Nav condicional*/}
    
    <Router>

      <Route exact path="/">
       <Welcome />
      </Route>
    
      <Route path="/home">
       
         <Nav onSearch={onSearch} dogDetailByName={dogDetailByName} onClose={onClose}  />
         <hr />
        
          <Dogs dogTemperaments={dogTemperaments} doggies={doggies} />
        
      </Route>

      <Route path="/detail/:id">
        <Nav onSearch={onSearch}/>
        <hr />
        <Detail />
      </Route>

      <Route path="/form">
        <Nav onSearch={onSearch}/>
        <hr />
        <Form handleSubmit={handleSubmit}/>
      </Route>

    </Router>
     
    </div>
  );
}

export default App;
