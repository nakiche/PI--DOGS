import './App.css';
import Nav from "./components/navbar/Nav.jsx";
import Detail from "./components/detail/Detail.jsx";
import Form from "./components/form/Form.jsx";
import Welcome from "./components/welcome/Welcome.jsx";
import Dogs from "./components/dogs/Dogs.jsx";
import { Route, HashRouter as Router } from 'react-router-dom';
import {dogs} from "./ExampledB.js"




function App() {  
//const location = useLocation()    

let onSearch = ()=>{

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
       
         <Nav onSearch={onSearch} />
        <div className="divDogs">  
          <Dogs dogs={dogs}/>
        </div>
      </Route>

      <Route path="/detail/:id">
        <Nav onSearch={onSearch}/>
        <Detail />
      </Route>

      <Route path="/form">
        <Nav onSearch={onSearch}/>
        <Form />
      </Route>

    </Router>
     
    </div>
  );
}

export default App;
