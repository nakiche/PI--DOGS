import styled from 'styled-components';
import { useHistory} from 'react-router-dom';

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

export default function Welcome() {  
let history = useHistory()
// const location = useLocation()  

   return (
      <div>
       {/*{console.log(location.pathname)}*/}
       <h1>Tommy's Dogs api</h1>
       <Buttons onClick={()=>{
               history.push('/home')
              }} >Enter</Buttons>
      </div>
   );
}