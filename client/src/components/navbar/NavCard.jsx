import styled from 'styled-components';
import { Link } from 'react-router-dom';


const DivCard = styled.div`
   border-radius: 25px;
   border: solid 1px;
   padding:5px;
   background-color:white;
   box-shadow: 0 0 0 0.2rem #B4CCC7;
   width: 25%;
   margin:5px;
`;

const InsideCard = styled.div`
   display:flex;
   flex-direction:column;
   `;

const H2 = styled.h2`
   font-size: 100%;
`;   
   
const P = styled.p`
   overflow-wrap: break-word;
   margin:0;
   font-size: 79%;
   padding:2px
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

const Span =styled.span`
font-weight:bold;
`

const SpanTitle =styled.span`
font-weight:bold;
font-size:100%;
background-color:#A7B6B3;
font-style:oblique;
`
export default function NavCard({id,name,temperaments,image,min_weight,max_weight,onClose}) {  

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
            <H2><SpanTitle>{name}</SpanTitle></H2>
            <P><Span>Temperaments: </Span>{newArray.toString()}</P>
            <P><Span>Weight: </Span>{min_weight}-{max_weight} pounds</P>
         </InsideCard>
       }
      </Link> 
      </DivCard>    
   );
}