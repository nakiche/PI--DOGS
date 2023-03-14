import styled from 'styled-components';
import { useHistory} from 'react-router-dom';

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

   return (
      <div>
       <h1>Tommy's Dogs api</h1>
       <Buttons onClick={()=>{
               history.push('/home')
              }} >Enter</Buttons>
      </div>
   );
}