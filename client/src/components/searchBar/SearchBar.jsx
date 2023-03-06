import styled from 'styled-components';
import React, { useState } from "react";

const Input = styled.input`
  border-radius: 5px;
  padding: 5px;
`;

const Buttons = styled.button`
  border-radius: 5px;
  margin: 10px;
  padding: 5px;
  background-color:grey;
  color:white;  
  font-size:1rem;
  font-family:cursive;
`;

export default function SearchBar({onSearch}) {

//export default function SearchBar() {  

const [dog, setDog] = useState('');

const handleInputChange = (event) => {
     setDog(event.target.value)
    }

   return (
      <form onSubmit={(e)=>{
        //console.log('este hay en e:' ,e)
        e.preventDefault();
        onSearch(dog);
        setDog('');
        const inputDOM =document.getElementById('task-input');
        inputDOM.value='';
        ;
        
        }}>
      <Input type='search' id='task-input' onChange={handleInputChange} />
      <Buttons>Search</Buttons>
      </form>
   );
}
