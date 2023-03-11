import './App.css';
import Nav from "./components/navbar/Nav.jsx";
import Detail from "./components/detail/Detail.jsx";
import Form from "./components/form/Form.jsx";
import Welcome from "./components/welcome/Welcome.jsx";
import Dogs from "./components/dogs/Dogs.jsx";
import { Route, HashRouter as Router } from 'react-router-dom';
//import {dogs} from "./ExampledB.js"
import {getDogsByName,createDog}  from '../src/actions/index.js';
import { useDispatch,useSelector } from 'react-redux'


function App() {  
const dispatch = useDispatch();

const dogDetailByName  = useSelector((state) =>state.dogByName);
console.log(dogDetailByName)
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
       
         <Nav onSearch={onSearch} dogDetailByName={dogDetailByName}  />
         <hr />
        
          <Dogs />
        
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
