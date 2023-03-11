import React from "react";

import styled from 'styled-components';
import SearchBar from '../searchBar/SearchBar.jsx'
import { Link } from 'react-router-dom';
import NavCard from './NavCard.jsx';

const DivDogs = styled.div`
   display: flex;
   flex-wrap:wrap;
   justify-content :space-around;
 `;



// const H4 =styled.h4`
//   margin-right: 10px;
//   margin-top:15px;
//   padding:0px;
//   color:white;  
//   font-size:1.1rem;
//   font-family:cursive;
// `;


// export default function Nav({onSearch,logout}) {

export default function Nav({onSearch,dogDetailByName}) {  


   const [doggies, setDoggies] = React.useState("");

   React.useEffect(() => {
   setDoggies(dogDetailByName)
   }, [dogDetailByName]);
   
    let onClose =  (id)=>{
      console.log(doggies)
      // let indice= doggies.findIndex(e=>e.id===id)
      // doggies.splice(indice,1)
      //setDoggies(doggies)
      setDoggies(doggies.filter(c => c.id !== id))
      let indice= doggies.findIndex(e=>e.id===id)
      doggies.splice(indice,1)
   }  

   return (
      <div className="clasePrueba">
     <Link to='/home'>
        <h4 className="borderRight">Home</h4>
      </Link>
      <Link to='/Form'>
        <h4 className="borderRight">Form</h4>
      </Link>   
     
    <SearchBar 
          //onSearch={(characterID) => window.alert(characterID)}
          onSearch={onSearch}
        />
   
   <DivDogs>   
       
      {doggies && doggies.map((c,b)=>
             
             <NavCard key={b}
              id={c.id}
              name={c.name}
              temperaments={c.Temperaments}
              image={c.image}
              min_weight={c.min_weight}
              max_weight={c.max_weight}
              onClose={onClose}
             />
             
         )  
      }
    </DivDogs>  

      </div>

   );
}