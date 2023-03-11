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
        const inputDOM =document.getElementById('task-input');
        inputDOM.value='';
        ;
        
        }}>
      <Input type='search' id='task-input' onChange={handleInputChange} />
      <Buttons>Search</Buttons>
      </form>
   );




  // const [name, setName] = useState("");
  // const [job, setJob] = useState("");
  // const [car, setCar] = useState("");

  // const mockData = [
  //   {
  //     name: "jane",
  //     job: "cool woman",
  //     car: "cooler car"
  //   },
  //   {
  //     name: "juan",
  //     job: "cool man",
  //     car: "cool car"
  //   },
  //   {
  //     name: "john",
  //     job: "engineer",
  //     car: "cool car"
  //   },
  //    {
  //     name: "john",
  //     job: "engineer",
  //     car: "nice car"
  //   }
  // ];

  // const handleFilter = (data, key, value) => {
  //   return data.filter(item => item[key] === value);
  // };

  // const renderData = data => (
  //   <ul>
  //     {data.map(item => (
  //       <li>
  //         <span>name:</span> <b>{item.name}</b>,<span>job:</span>{" "}
  //         <b>{item.job}</b>,<span>car:</span> <b>{item.car}</b>
  //       </li>
  //     ))}
  //   </ul>
  // );

  // let filteredData = [...mockData];
  // if (name) {
  //   filteredData = handleFilter(filteredData, "name", name);
  // }
  // if (job) {
  //   filteredData = handleFilter(filteredData, "job", job);
  // }
  // if (car) {
  //   filteredData = handleFilter(filteredData, "car", car);
  // }

  // return (
  //   <div className="">
  //     <div>
  //       <input
  //         value={name}
  //         onChange={e => setName(e.target.value)}
  //         placeholder="name filter"
  //       />
  //       <input
  //         value={job}
  //         onChange={e => setJob(e.target.value)}
  //         placeholder="job filter"
  //       />
  //       <input
  //         value={car}
  //         onChange={e => setCar(e.target.value)}
  //         placeholder="car filter"
  //       />
  //     </div>
  //     {!!filteredData.length ? (
  //       renderData(filteredData)
  //     ) : (
  //       <p>nothing found mate!</p>
  //     )}
  //   </div>
  // );
};



