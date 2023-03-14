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

//creando un estado
const [dogName, setDogName] = useState('');

const handleInputChange = (event) => {
     setDogName(event.target.value)
    }

   return (
      <form onSubmit={(e)=>{
        e.preventDefault();
        onSearch(dogName);
        setDogName('');
        e.target.reset()
        }}>
      <Input type='search' id='task-input' placeholder="Enter a dog breed..." onChange={handleInputChange} />
      <Buttons>Search</Buttons>
      </form>
   );

};



