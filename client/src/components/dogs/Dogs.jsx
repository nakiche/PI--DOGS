import styled from 'styled-components';
import React  from "react";
//import { connect } from "react-redux";
import Dog from '../dog/Dog.jsx';
import Paginate from '../paginate/Paginate.jsx';
import { useDispatch,useSelector } from 'react-redux';
import  {getCurrentPage,nextPrevPag}  from '../../actions/index.js';

const Select = styled.select`
   font-family:cursive;
   text-align:center;
   width:18%;
   border-radius:10px;
   `;

const DivError = styled.div`
   margin :5px;
   color: red;
   font-size:1rem;
`;

export default function Dogs({dogTemperaments,doggies}) {  
    const dispatch = useDispatch();
    const page  = useSelector((state) =>state.currentPage);

    let cleanState=()=>{
      setErrors('')
    }

   //component states
   const [dogs, setDogs] = React.useState({dogs:"",
                                           filtered:[],
                                         });
   const [errors, setErrors] = React.useState('')
   //pagination states
   const [currentPage, setCurrentPage] = React.useState(page);
   const [postsPerPage] = React.useState(8);


   //creando estados para los filtros
   const [sort,setSort]=React.useState('');
   const [temperament, setTemperament] = React.useState([]);


   const handleSelectTemperamentChange = (e) => {
        
    if (e.target.value  === 'api'){
      let filtered= doggies.filter(e=>e.fromApi===true)
       setDogs({
          ...dogs,
       filtered
      })
    } else if (e.target.value === 'db'){
       let filtered=doggies.filter(e=>e.fromApi===undefined)
       if (filtered.length===0) {
        setErrors(`There are no dogs stored in database`)
        setTimeout(cleanState, 3000);
        }
      setDogs({...dogs,
         filtered
      })

    }
    else if (e.target.value === 'all'){
          setDogs({...dogs,
          filtered:[]
          })
     }
   else{
     setTemperament(Array.from(e.target.selectedOptions, option => option.value))
      }

    let pageRedux= (dispatch(getCurrentPage(1)))
    setCurrentPage(pageRedux.payload)

   }

   //using UseEffect to get lastest state
   React.useEffect(() => {
    let filterByTemperament=[]  
    
      for (let i = 0; i < doggies.length; i++) {
         let arraySearch=doggies[i].Temperaments[0].name
         temperament.some(r=> arraySearch.includes(r)) && filterByTemperament.push(doggies[i])
      }
      setDogs({...dogs,
            filtered:filterByTemperament
         })
   }, [temperament]);


   const sortDesc = key => (a, b) => a[key] < b[key] ? 1 : -1;
   const sortAsc = key => (a, b) => a[key] - b[key];

  const handleSortByOrder = (selection) =>{
  if (selection==='a-z'){
      let filtered= doggies.slice().sort(sortAsc('name'))
      setDogs({...dogs,
             filtered
    })
   }else if (selection==='z-a'){
      let filtered= doggies.slice().sort(sortDesc('name'))
      setDogs({...dogs,
            filtered
         }) 
   
   }else if (selection==='g-l'){
      let filtered= doggies.slice().sort(sortDesc('max_weight'))
      setDogs({...dogs,
            filtered
         }) 
   
   }else if (selection==='l-g'){
      let filtered= doggies.slice().sort(sortAsc('max_weight'))
      setDogs({...dogs,
            filtered
         }) 
   }

   let pageRedux= (dispatch(getCurrentPage(1)))
   setCurrentPage(pageRedux.payload)
 }
 
  //pagination variables
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = dogs.filtered.length===0 ? doggies.slice(indexOfFirstPost, indexOfLastPost) : dogs.filtered.slice(indexOfFirstPost, indexOfLastPost)

   const paginate =  (pageNumber) => {
       //setCurrentPage(pageNumber);
    let pageRedux= (dispatch(getCurrentPage(pageNumber)))
    setCurrentPage(pageRedux.payload)
   };
   const previousPage = () => {
      if (currentPage !== 1) {
         //setCurrentPage(currentPage - 1);
        dispatch(nextPrevPag('prev'))
        setCurrentPage(currentPage - 1);
      }
   };
   const nextPage = () => {
      if (currentPage !== Math.ceil(doggies.length / postsPerPage)) {
         //setCurrentPage(currentPage + 1);
        dispatch(nextPrevPag('next'))
        setCurrentPage(currentPage + 1);
      }
   };

    return (
    <div> 
    {errors && <DivError >{errors}</DivError>}  
    <span>Please choose: </span>
    <Select name="temperaments" id="" multiple size="5" onChange={(e)=>{
         e.preventDefault();
         handleSelectTemperamentChange(e);
         }}>
         <optgroup label="Sort by Origin">
             <option value="all">All dogs</option>
             <option value="api">Api dogs</option>
             <option value="db">Created dogs</option>
          </optgroup>     
          <optgroup label="Sort by temperament">       
               {dogTemperaments && dogTemperaments.map((c,b)=>
                      <option value={c} key={b}>{c}</option>
               )} 
          </optgroup>     
      </Select>  

        <Select name={sort} id="" multiple size="5" onChange={(e)=>{
         e.preventDefault();
         setSort(e.target.value)
         handleSortByOrder(e.target.value)
         }}>
         <optgroup label="Sort by">
          <option value="a-z">A-z sort</option>
          <option value="z-a">Z-a sort</option>
          </optgroup>  
          
          <optgroup label="Sort by">
          <option value="l-g">Lesser to greater weight</option>
          <option value="g-l">Greater to lesser weight</option>
          </optgroup>  


        </Select>  
  
     <div className="divDogs">
        {currentPosts && currentPosts.map((c,b)=>
            
             <Dog key={b}
              id={c.id}
              name={c.name}
              temperaments={c.Temperaments}
              image={c.image}
              min_weight={c.min_weight}
              max_weight={c.max_weight}
           />
         )
        }  
          
        </div>
         <Paginate postsPerPage={postsPerPage}
             totalPosts={dogs.filtered.length===0 ? doggies.length :dogs.filtered.length}
             paginate={paginate}
             previousPage={previousPage}
             nextPage={nextPage}
             currentPage={currentPage}
             />
    </div>
    ); 
}

