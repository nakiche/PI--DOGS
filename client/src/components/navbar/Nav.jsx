import React from "react";

import styled from 'styled-components';
import SearchBar from '../searchBar/SearchBar.jsx'
import { Link,useLocation } from 'react-router-dom';
import NavCard from './NavCard.jsx';

const DivDogs = styled.div`
   display: flex;
   flex-wrap:wrap;
   justify-content :space-around;
 `;

const Bloque = styled.div`
  background-color:#B4CCC7;
  display:flex;
  justify-content:flex-end;
`;

const H4 =styled.h4`
  margin-right: 10px;
  margin-top:15px;
  padding-right:5px;
  color:white;  
  font-size:1.1rem;
  font-family:cursive;
`;


export default function Nav({onSearch,dogDetailByName,onClose}) {  
  const location = useLocation()
  
  const [doggies, setDoggies] = React.useState("");

   React.useEffect(() => {
   setDoggies(dogDetailByName)
   }, [dogDetailByName]);
   

   return (
 <div className="">
   <Bloque>
     <Link to='/home'>
        <H4 className="borderRight">Home</H4>
      </Link>
      <Link to='/Form'>
        <H4 className="borderRight">Form</H4>
      </Link>   
     
    <SearchBar 
          onSearch={onSearch}
        />
   </Bloque>    

  {/*{ location.pathname === '/home' && */}
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
  {/*}*/}
    </div>
   );
}