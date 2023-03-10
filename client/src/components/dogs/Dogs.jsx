import React, { useState }  from "react";
//import { connect } from "react-redux";
import Dog from '../dog/Dog.jsx';
import Paginate from '../paginate/Paginate.jsx';
import  {getDogs,getTemperaments,sortByOrigin}  from '../../actions/index.js';
import { useDispatch,useSelector } from 'react-redux'

//export class Dogs extends Component {
export default function Dogs() {  

//creando un estado para los temperamentos
const [temperament, setTemperament] = useState('');

const dispatch = useDispatch();

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

//const dogsState  = useSelector((state) =>state.dogs);
   //const [blogPosts, setBlogPosts] = useState([]);
   const [dogs, setDogs] = React.useState({dogs:"",
                                           filtered:[],
                                           ordered:[]
                                         });
   const [currentPage, setCurrentPage] = React.useState(1);
   const [postsPerPage] = React.useState(8);
    
    // ...

      //sort section
   const handleSortByOrigin = (e) =>{
      console.log(e.target.value)
    if (e.target.value === 'api'){
      let filtered=dogs.dogs.filter(e=>e.fromApi===true)
      setDogs({
         ...dogs,
         filtered})
    } else if (e.target.value === 'db'){
      let filtered=dogs.dogs.filter(e=>e.fromApi===undefined)
      setDogs({...dogs,
         filtered})
    }else if (e.target.value === 'none'){
         setDogs({...dogs,
         filtered:[]
         })
    }
  } 

  const sortDesc = key => (a, b) => a[key] < b[key] ? 1 : -1;
  const sortAsc = key => (a, b) => a[key] - b[key];

  const handleSortByOrder = (e) =>{
 //if (dogs.filtered.length==0){
   if (e.target.value==='a-z'){
      setDogs({...dogs,
            filtered:dogs.dogs.slice().sort(sortAsc('name')),
         })
   }else if (e.target.value==='z-a'){
      setDogs({...dogs,
            filtered:dogs.dogs.slice().sort(sortDesc('name')),
         }) 
   
   }else if (e.target.value === 'none'){
         setDogs({...dogs,
         filtered:[]
         })
    }
  //   }else{
  //     if (e.target.value==='a-z'){
  //     setDogs({...dogs,
  //           filtered:dogs.filtered.slice().sort(sortAsc('name')),
  //        })
  //     }else if (e.target.value==='z-a'){
  //     setDogs({...dogs,
  //           filtered:dogs.filtered.slice().sort(sortDesc('name')),
  //        })
  //   }
  // }

 }
  
    // componentDidMount(){
    //    this.props.getDogs() 
       
    // }

   React.useEffect(() => {
   async function fetchData() {
    // You can await here
    let response =await dispatch(getDogs());
    setDogs({
      ...dogs,
      dogs:response.payload
      })
    // ...})
   }
   fetchData();
   },[]);


   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = dogs.filtered.length===0 ? dogs.dogs.slice(indexOfFirstPost, indexOfLastPost) : dogs.filtered.slice(indexOfFirstPost, indexOfLastPost)



   //console.log(dogs)
  const paginate =  (pageNumber) => {
       setCurrentPage(pageNumber);
   };

   const previousPage = () => {
      if (currentPage !== 1) {
         setCurrentPage(currentPage - 1);
      }
   };

   const nextPage = () => {
      if (currentPage !== Math.ceil(dogs.dogs.length / postsPerPage)) {
         setCurrentPage(currentPage + 1);
      }
   };

  const handleSelectTemperamentChange = (e) => {
  let value = Array.from(e.target.selectedOptions, option => option.value);
  //console.log(value)
  //this.setState({values: value});
  setTemperament(value)

   }

    return (
    <div> 
    <select name="temperaments" id="" onChange={(e)=>{
         e.preventDefault();
         handleSelectTemperamentChange(e);
         }}>
          <option value="">--Sort by temperament--</option>
               {/*<option value="Temperaments" disabled>choose temeperaments</option>*/}
               {dogTemperaments && dogTemperaments.map((c,b)=>
                      <option value={c} key={b}>{c}</option>
               )} 
      </select>  

        <select name="" id="" onChange={(e)=>{
         e.preventDefault();
         handleSortByOrigin(e);
         }}>
          <option value="none">--Api dogs or created dogs--</option>
          <option value="api">Api dogs</option>
          <option value="db">Created dogs</option>
        </select>  

        <select name="" id="" onChange={(e)=>{
         e.preventDefault();
         handleSortByOrder(e)
         }}>
          <option value="none">--Sort A-z or sort Z-a--</option>
          <option value="a-z">A-z order</option>
          <option value="z-a">Z-a order</option>
        </select>  


         <select name="" id="" onChange={(e)=>{
         e.preventDefault();
         //handleGender(e);
         }}>
          <option value="">--Sort by weight--</option>
          <option value="Male">Greater to lesser weight</option>
          <option value="Female">Lesser to greater weight</option>
        </select> 


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
        <div>
          <Paginate postsPerPage={postsPerPage}
             totalPosts={dogs.filtered.length==0 ? dogs.dogs.length :dogs.filtered.length}
             paginate={paginate}
             previousPage={previousPage}
             nextPage={nextPage}
             />  
         </div>    
        </div>     
     ) : (
        <div className="loading">Loading...</div>
     
     )}

    </div>
    );
  
}

