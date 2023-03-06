
//import styled from 'styled-components';
import SearchBar from '../searchBar/SearchBar.jsx'
import { Link } from 'react-router-dom';


// const Bloque = styled.div`
//   background-color:#3D5656;
//   margin-bottom:15px;
//   display:flex;
//   justify-content:flex-end;
// `;

// const H4 =styled.h4`
//   margin-right: 10px;
//   margin-top:15px;
//   padding:0px;
//   color:white;  
//   font-size:1.1rem;
//   font-family:cursive;
// `;

// const Buttons = styled.button`
//   border-radius: 5px;
//   margin: 10px;
//   padding: 5px;
//   background-color:red;
//   color:white;  
//   font-size:1rem;
//   font-family:cursive;
// `;

// export default function Nav({onSearch,logout}) {

export default function Nav({onSearch}) {  
   //console.log(onSearch)
   return (
      <div className="clasePrueba">
     <Link to='/home'>
        <h4>Home</h4>
      </Link>
      <Link to='/Form'>
        <h4>Form</h4>
      </Link>   
     
    <SearchBar 
          //onSearch={(characterID) => window.alert(characterID)}
          onSearch={onSearch}
        />
      </div>
   );
}