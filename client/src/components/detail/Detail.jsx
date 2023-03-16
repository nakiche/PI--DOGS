import styled from 'styled-components';
import React  from "react";
import  {getDogsById}  from '../../actions/index.js';
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { useHistory} from 'react-router-dom';


const DivCard = styled.div`
   border-radius: 25px;
   border: solid 1px;
   display:inline-block;
   padding:5px;
   background-color:white;
    box-shadow: 0 0 0 0.2rem #B4CCC7;
   //position:relative;
   width : 50%;
   margin:5px;
`;

const InsideCard = styled.div`
   display:flex;
   flex-direction:column;
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
    height: 300px;
    object-fit: contain;
    border-radius: 25px;
    margin-bottom:5px;
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

const Buttons = styled.button`
  border-radius: 5px;
  margin: 10px;
  padding: 5px;
  background-color:grey;
  color:white;  
  font-size:1rem;
  font-family:cursive;
`;

const Detail = (props) => {
let history = useHistory()

  const dispatch = useDispatch();
  let {id} = useParams();

  //mapStateToProps
    const dogDetail  = useSelector((state) =>state.dogById);
  
  //component didMount
  React.useEffect(() => {
   async function fetchData() {
    // You can await here
    try{
    await dispatch(getDogsById(id));
    }catch(e)
    {
      window.alert(e)
    }
    // ...
  }
  fetchData(); 
  },[id]);

    
 if(Object.entries(dogDetail).length>0){
    let newArray=[]
    if (dogDetail[0].Temperaments.length !== 0 )
      {
       newArray =dogDetail[0].Temperaments.map(e=> e.name)
      }else{
      newArray=dogDetail.Temperaments
    }

    return (
       <div>
       <DivCard>
       <h1><SpanTitle>{dogDetail[0].name}</SpanTitle></h1>
       <InsideCard>  
            <IMG  src={dogDetail[0].image} alt={dogDetail[0].image} />
            <P><Span>Id: </Span>{dogDetail[0].id}</P>
            <P><Span>Height: </Span>{dogDetail[0].height} inches</P>
            <P><Span>Weight: </Span>{dogDetail[0].min_weight} - {dogDetail[0].max_weight} pounds</P>
            <P><Span>Temperaments: </Span>{newArray.toString()}</P>
            <P><Span>Life span: </Span>{dogDetail[0].life_span}</P>

         </InsideCard>
         
      </DivCard>
      <div>
      <Buttons onClick={()=>{
               history.push('/home')
              }} >Go back</Buttons>  
      </div>
    
      </div> 
    )
  }else{
    
    return (
      <div>

      </div>
      )
  }
};

export default Detail;
