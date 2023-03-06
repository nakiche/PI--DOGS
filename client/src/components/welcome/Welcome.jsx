import { useHistory} from 'react-router-dom';

export default function Welcome() {  
let history = useHistory()
// const location = useLocation()  

   return (
      <div>
       {/*{console.log(location.pathname)}*/}
       <h1>Dogs Application</h1>
       <button onClick={()=>{
               history.push('/home')
              }} >Enter</button>
      </div>
   );
}