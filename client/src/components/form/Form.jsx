import React from 'react';
import styled from 'styled-components';
import  {getTemperaments}  from '../../actions/index.js';
import { useDispatch,useSelector } from 'react-redux'
import Validate from './Validate.jsx';
import { useHistory} from 'react-router-dom';


const DivCard = styled.div`
   border-radius: 25px;
   border: solid 2px;
   display:inline-block;
   padding:5px;
   background-color:white;
   box-shadow: 0 0 0 0.1rem black;
   position:relative;
   width:50%;
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

const SubmitButton = styled.button`
  border-radius: 5px;
  margin: 10px;
  padding: 5px;
  background-color:grey;
  color:white;  
  font-size:1rem;
  font-family:cursive;
`;

export default function Form({handleSubmit,validateName}) {  
const dispatch = useDispatch();
let history = useHistory()

const dogTemperaments  = useSelector((state) =>state.dogTemperaments);

React.useEffect(() => {
   async function fetchData() {
    // You can await here
    try{
    await dispatch(getTemperaments());
    }catch(e)
    {
      window.alert(e)
    }
    // ...
  }
  fetchData(); 

  },[]);

const [errors, setErrors] = React.useState({
   name: '',
   min_life_span: '' ,
   max_life_span:'',
   min_height:'',
   max_height:'',
   min_weight:'',
   max_weight:'',
   temperament:''

});

const [dogData, setDogData] = React.useState({ 
  name: '', 
  min_life_span: '' ,
  max_life_span:'',
  min_height:'',
  max_height:'',
  min_weight:'',
  max_weight:'',
  temperament:'',
});

 const handleInputChange  = (evento) =>{

  if(evento.target.name==='name') {
    validateName(evento.target.value)  
 }

  setDogData({
      ...dogData,
     [evento.target.name]: evento.target.value, // Sintaxis ES6 para actualizar la key correspondiente
    });

  setErrors(
   Validate({
      ...dogData,
      [evento.target.name]: evento.target.value,
   })
  );
 } 

 const handleSelectChange = (e) => {
  let value = Array.from(e.target.selectedOptions, option => option.value);
  
  setDogData({
      ...dogData,
   temperament:value
   })

   setErrors(
   Validate({
      ...dogData,
      [e.target.name]: e.target.value,
   })
  );
}
  
   return (
    <div>
      <DivCard>
        <h1>Create a new dog</h1>
    
        <form onSubmit={(e)=>{
              e.preventDefault();
              handleSubmit(dogData);
              if (!validateName(dogData.name)){
               setDogData({name: '', 
              min_life_span: '' ,
              max_life_span:'',
              min_height:'',
              max_height:'',
              min_weight:'',
              max_weight:'',
              temperament:'',});
              e.target.reset();
              }
            }}>
         <div>
            <label htmlFor="">Name:</label>
            <input 
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  placeholder="Breed name..."
            />
            <p style={{fontSize: '15px',
                       color: 'red'}}>{errors.name}
            </p>
            <label htmlFor="">Minumum life span:</label>
            <input 
                  type="number"
                  name="min_life_span"
                  onChange={handleInputChange}
                  placeholder="Breed's minimum life span..."
            />
            <p style={{fontSize: '15px',color: 'red'}}>{errors.min_life_span}</p>
            <label htmlFor="">Maximum life span:</label>
            <input 
                  type="number"
                  name="max_life_span"
                  onChange={handleInputChange}
                  placeholder="Breed's maximum life span..."
            />
            <p style={{fontSize: '15px',color: 'red'}}>{errors.max_life_span}</p>
         </div>

         <div>
            <label htmlFor="">Min height:</label>
            <input 
                  type="number"
                  name="min_height"
                  onChange={handleInputChange}
                  placeholder="Breed's minimun height..."
            />
            <p style={{fontSize: '15px',color: 'red'}}>{errors.min_height}</p>

            <label htmlFor="">Max height:</label>
            <input 
                  type="number"
                  name="max_height"
                  onChange={handleInputChange}
                  placeholder="Breed's maximun height..."
            />
            <p style={{fontSize: '15px',color: 'red'}}>{errors.max_height}</p>
          </div>

          <div>
            <label htmlFor="">Min weight:</label>
            <input 
                  type="number"
                  name="min_weight"
                  onChange={handleInputChange}
                  placeholder="Breed's minimun weight..."
            />
            <p style={{fontSize: '15px',color: 'red'}}>{errors.min_weight}</p>

            <label htmlFor="">Max weight:</label>
            <input 
                  type="number"
                  name="max_weight"
                  onChange={handleInputChange}
                  placeholder="Breed's maximun height..."
            />
            <p style={{fontSize: '15px',color: 'red'}}>{errors.max_weight}</p> 
          </div>

          <div>
             <label htmlFor="">Temperaments:</label>
             <select name="temperament" id="" multiple onChange={handleSelectChange}>
                    {/*<option value="Temperaments" disabled>choose temeperaments</option>*/}
                    {dogTemperaments && dogTemperaments.map((c,b)=>
                        <option value={c} key={b}>{c}</option>
                     )}             
            </select>
            <p style={{fontSize: '15px',color: 'red'}}>{errors.temperament}</p> 
          </div>
         
        <div>
        
         <SubmitButton type="submit" disabled={dogData.name && dogData.min_life_span && dogData.max_life_span 
        && dogData.min_height && dogData.max_height && dogData.min_weight 
        && dogData.max_weight && dogData.temperament.length!==0 ? false : true}>Create dog</SubmitButton>
         </div>
      </form>
      
      </DivCard>
      <div>
      <Buttons onClick={()=>{
               history.push('/home')
              }} >Go back</Buttons>  
      </div>
     </div> 
   );
}