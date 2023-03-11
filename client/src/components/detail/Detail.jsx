import  styled from 'styled-components';
import React  from "react";
import  {getDogsById}  from '../../actions/index.js';
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router';


const DivCard = styled.div`
   border-radius: 25px;
   border: solid 2px;
   display:inline-block;
   padding:5px;
   background-color:white;
   box-shadow: 0 0 0 0.1rem black;
   //position:relative;
   width : 50%;
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
    margin-bottom:5px;
`;

const Detail = (props) => {

  const dispatch = useDispatch();
  let {id} = useParams();

  //aqui es como el mapStateToProps
    const dogDetail  = useSelector((state) =>state.dogById);
  
  //este es el component didMount
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
    if (dogDetail[0].Temperaments.length > 0 )
      {
       newArray =dogDetail[0].Temperaments.map(e=> e.name)
      }else{
      newArray=dogDetail.Temperaments
    }

    return (
       <DivCard>
       <h1>Details about the dog</h1>
       <InsideCard>  
            <IMG  src={dogDetail[0].image} alt={dogDetail[0].image} />
            <h4>{dogDetail[0].id}</h4>
            <H2>{dogDetail[0].name}</H2>
            <h4>{dogDetail[0].height} inches</h4>
            <h4>{dogDetail[0].min_weight} - {dogDetail[0].max_weight} pounds</h4>
            <P>{newArray.toString()}</P>
            <h4>{dogDetail[0].life_span}</h4>

         </InsideCard>
      </DivCard>
    );
  }else{
    
    return (
      <div>

      </div>
      )
  }
};

export default Detail;
