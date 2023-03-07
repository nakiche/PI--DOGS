import styled from 'styled-components';
import { Link } from 'react-router-dom';


const DivCard = styled.div`
   border-radius: 25px;
   border: solid 2px;
   //display:inline-block;
   padding:5px;
   background-color:white;
   box-shadow: 0 0 0 0.1rem black;
   //position:relative;
   width : 20%;
   margin:5px;
`;

const InsideCard = styled.div`
   display:flex;
   flex-direction:column;
   `;

const H2 = styled.h2`
   background-color : grey;
   margin:0;
   font-size: 82%;
   //position: absolute; left: 10px; top: 300px;
`;   

const P = styled.p`
   overflow-wrap: break-word;
   margin:0;
   font-size: 79%;
   padding:2px
   //position: absolute; left: 10px; top: 300px;
`;  

const IMG = styled.img`
    max-width: 100%;
    //width: 200px;
    height: 200px;
    object-fit: contain;
    border-radius: 25px;
`;

const Buttons = styled.button`
  border-radius: 5px;
  margin: 7px;
  padding: 3px;
  background-color:#FF787A;
  color:white;  
`;


export default function NavCard({id,name,temperaments,image,weight,onClose}) {  

   let newArray=[]
   if (temperaments[0].name.length > 1 )
   {
      newArray =temperaments.map(e=> e.name)
   }else{
      newArray=temperaments
   }

   return (
      <DivCard>
      <Buttons onClick={(e)=>{
         e.preventDefault();
         
         onClose(id);
         }}>X</Buttons>
      <Link to= {`/detail/${id}`}>          
       {
         <InsideCard>  
            <IMG  src={image} alt={image} />
            <H2>{name}</H2>
            <P>{newArray.toString()}</P>
            <h4>{weight} pounds</h4>
         </InsideCard>
       }
      </Link> 
      </DivCard>    
   );
}