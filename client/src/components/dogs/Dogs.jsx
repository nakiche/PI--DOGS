import React from "react";
//import { connect } from "react-redux";
import Dog from '../dog/Dog.jsx';
import Paginate from '../paginate/Paginate.jsx';
import  {getDogs}  from '../../actions/index.js';
import { useDispatch,useSelector } from 'react-redux'

//export class Dogs extends Component {
export default function Dogs() {  

const dispatch = useDispatch();

//const dogsState  = useSelector((state) =>state.dogs);
   //const [blogPosts, setBlogPosts] = useState([]);
   const [dogs, setDogs] = React.useState([]);
   const [currentPage, setCurrentPage] = React.useState(1);
   const [postsPerPage] = React.useState(8);
    
    // ...
 
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = dogs.slice(indexOfFirstPost, indexOfLastPost);
    // componentDidMount(){
    //    this.props.getDogs() 
       
    // }

   React.useEffect(() => {
   async function fetchData() {
    // You can await here
    let response =await dispatch(getDogs());
    setDogs(response.payload)
    // ...
   }
   fetchData();
   },[]);

  const paginate =  (pageNumber) => {
       setCurrentPage(pageNumber);
   };

   const previousPage = () => {
      if (currentPage !== 1) {
         setCurrentPage(currentPage - 1);
      }
   };
 
   const nextPage = () => {
      if (currentPage !== Math.ceil(dogs.length / postsPerPage)) {
         setCurrentPage(currentPage + 1);
      }
   };


    return (
    <div> 
  {dogs ? ( 
     <div className="divDogs">
        {currentPosts && currentPosts.map((c,b)=>
            
             <Dog key={b}
              id={c.id}
              name={c.name}
              temperaments={c.Temperaments}
              image={c.image}
              weight={c.weight}
            //onClose={props.onClose}
           />
         )
        }  
          <Paginate postsPerPage={postsPerPage}
             totalPosts={dogs.length}
             paginate={paginate}
             previousPage={previousPage}
             nextPage={nextPage}
             />  
        </div>     
     ) : (
        <div className="loading">Loading...</div>
     
     )}

    </div>
    );
  
}

