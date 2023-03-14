import styled from 'styled-components';
import React  from "react";
//import { connect } from "react-redux";
import Dog from '../dog/Dog.jsx';
import Paginate from '../paginate/Paginate.jsx';
import  {getDogs,getTemperaments}  from '../../actions/index.js';
import { useDispatch,useSelector } from 'react-redux'

const Select = styled.select`
   font-family:cursive;
   text-align:center;
   width:18%;
   border-radius:10px;
   `;
   
export default function Dogs({dogTemperaments,doggies}) {  
   const dispatch = useDispatch();

   //component states
   const [dogs, setDogs] = React.useState({dogs:"",
                                           filtered:[],
                                         });
   //pagination states
   const [currentPage, setCurrentPage] = React.useState(1);
   const [postsPerPage] = React.useState(8);

   

   //creando estados para los filtros
   const [api_Db,setApi_Db]=React.useState('');
   const [sort,setSort]=React.useState('');
   const [temperament, setTemperament] = React.useState([]);

   // React.useEffect(() => {
   //    async function fetchData() {
   //     // You can await here
   //     //await dispatch(getTemperaments()); //temperaments
   //     let response =await dispatch(getDogs()); //dogs
   //     setDogs({
   //       ...dogs,
   //       dogs:response.payload
   //       })
      
   // }
   // fetchData();
   // },[]);

   //    React.useEffect(() => {
   //    async function fetchData() {
   //     // You can await here
   //     //await dispatch(getTemperaments()); //temperaments
       
   //     setDogs({
   //       ...dogs,
   //       dogs:doggies
   //       })
      
   // }
   // fetchData();
   // },[doggies]);

   // React.useEffect(() => {
   //    async function fetchData() {
   //     // You can await here
   //     await dispatch(getDogs()); //
   // }
   // fetchData();
   // },[]);

   

   const handleSelectTemperamentChange = (e) => {
      console.log (e.target.selectedOptions)
     //let value = Array.from(e.target.selectedOptions, option => option.value);
   
        if (e.target.value  === 'api'){
      //let filtered=dogs.filtered.length==0 ? doggies.filter(e=>e.fromApi===true) : dogs.filtered.filter(e=>e.fromApi===true)
      //filteredData=filteredData.dogs.filter(e=>e.fromApi===true)
      let filtered= doggies.filter(e=>e.fromApi===true)
       setDogs({
          ...dogs,
       filtered
      })
      //return filtered
      
    } else if (e.target.value === 'db'){
      //let filtered=dogs.filtered.length==0 ? doggies.filter(e=>e.fromApi===undefined) : dogs.filtered.filter(e=>e.fromApi===undefined)
      //filteredData=filteredData.dogs.filter(e=>e.fromApi===undefined)
       let filtered=doggies.filter(e=>e.fromApi===undefined)
       if (filtered.length===0) window.alert('There are no dogs stored in database')
      setDogs({...dogs,
         filtered
      })
      //return filtered
    }
    else if (e.target.value === 'all'){
          setDogs({...dogs,
          filtered:[]
          })
    // //   filtered=[]
    // //   return filtered
     }

   else{
     setTemperament(Array.from(e.target.selectedOptions, option => option.value))
      }
   }

   //using UseEffect to get lastest state
   React.useEffect(() => {
    let filterByTemperament=[]  
  
      for (let i = 0; i < doggies.length; i++) {
         let arraySearch=doggies[i].Temperaments[0].name
          //const found = temperament.some(r=> arraySearch.includes(r)) && filterByTemperament.push(doggies[i])
         temperament.some(r=> arraySearch.includes(r)) && filterByTemperament.push(doggies[i])
      }
      setDogs({...dogs,
            //filtered:doggies.slice().sort(sortAsc('name')),
            filtered:filterByTemperament
         })
   }, [temperament]);


   const handleSortByOrigin = (selection) =>{
   
    if (selection === 'api'){
      //let filtered=dogs.filtered.length==0 ? doggies.filter(e=>e.fromApi===true) : dogs.filtered.filter(e=>e.fromApi===true)
      //filteredData=filteredData.dogs.filter(e=>e.fromApi===true)
      let filtered= doggies.filter(e=>e.fromApi===true)
       setDogs({
          ...dogs,
       filtered
      })
      //return filtered
      
    } else if (selection === 'db'){
      //let filtered=dogs.filtered.length==0 ? doggies.filter(e=>e.fromApi===undefined) : dogs.filtered.filter(e=>e.fromApi===undefined)
      //filteredData=filteredData.dogs.filter(e=>e.fromApi===undefined)
       let filtered=doggies.filter(e=>e.fromApi===undefined)
       if (filtered.length===0) window.alert('No dogs stored in database')
      setDogs({...dogs,
         filtered
      })
      //return filtered
    }
    else if (selection === 'all'){
          setDogs({...dogs,
          filtered:[]
          })
    // //   filtered=[]
    // //   return filtered
     }
  } 

   const sortDesc = key => (a, b) => a[key] < b[key] ? 1 : -1;
   const sortAsc = key => (a, b) => a[key] - b[key];

  const handleSortByOrder = (selection) =>{
// if (dogs.filtered.length<1){
   if (selection==='a-z'){
      //let filtered= dogs.filtered.length==0 ? doggies.slice().sort(sortAsc('name')) : dogs.filtered.slice().sort(sortAsc('name'))
      let filtered= doggies.slice().sort(sortAsc('name'))
      //filteredData=filteredData.dogs.slice().sort(sortAsc('name'))
      setDogs({...dogs,
            //filtered:doggies.slice().sort(sortAsc('name')),
            filtered
         })
      
   }else if (selection==='z-a'){
      //let filtered= dogs.filtered.length==0 ? doggies.slice().sort(sortDesc('name')) : dogs.filtered.slice().sort(sortDesc('name'))
      let filtered= doggies.slice().sort(sortDesc('name'))
      //filteredData=filteredData.dogs.slice().sort(sortDesc('name'))
      setDogs({...dogs,
            filtered
            //filtered:doggies.slice().sort(sortDesc('name')),
         }) 
   
   }else if (selection==='g-l'){
      //let filtered= dogs.filtered.length==0 ? doggies.slice().sort(sortDesc('name')) : dogs.filtered.slice().sort(sortDesc('name'))
      let filtered= doggies.slice().sort(sortDesc('max_weight'))
      //filteredData=filteredData.dogs.slice().sort(sortDesc('name'))
      setDogs({...dogs,
            filtered
            //filtered:doggies.slice().sort(sortDesc('name')),
         }) 
   
   }else if (selection==='l-g'){
      //let filtered= dogs.filtered.length==0 ? doggies.slice().sort(sortDesc('name')) : dogs.filtered.slice().sort(sortDesc('name'))
      let filtered= doggies.slice().sort(sortAsc('max_weight'))
      //filteredData=filteredData.dogs.slice().sort(sortDesc('name'))
      setDogs({...dogs,
            filtered
            //filtered:doggies.slice().sort(sortDesc('name')),
         }) 
   
   }

 }
 
 // const handleFilter = (data, key, value) => {
    //return data.filter(item => item[key] === value);
  //};

 //if (api_Db) {
   //console.log(api_Db)
    //filteredData = handleFilter(filteredData, "name", name);
   //filteredData = handleSortByOrigin("api");
  //}

console.log(doggies)
  //pagination variables
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = dogs.filtered.length===0 ? doggies.slice(indexOfFirstPost, indexOfLastPost) : dogs.filtered.slice(indexOfFirstPost, indexOfLastPost)

 
  const paginate =  (pageNumber) => {
       setCurrentPage(pageNumber);
   };
   const previousPage = () => {
      if (currentPage !== 1) {
         setCurrentPage(currentPage - 1);
      }
   };
   const nextPage = () => {
      if (currentPage !== Math.ceil(doggies.length / postsPerPage)) {
         setCurrentPage(currentPage + 1);
      }
   };

    return (
    <div> 
    <span>Please choose: </span>
    <Select name="temperaments" id="" multiple size="5" onChange={(e)=>{
         e.preventDefault();
         handleSelectTemperamentChange(e);
         //handleSortByTemperament()
         }}>
         <optgroup label="Sort by Origin">
             <option value="all">All dogs</option>
             <option value="api">Api dogs</option>
             <option value="db">Created dogs</option>
          </optgroup>     
          <optgroup label="Sort by temperament">
          {/*<option value="">Sort by  </option>*/}
               {/*<option value="Temperaments" disabled>choose temeperaments</option>*/}
               {dogTemperaments && dogTemperaments.map((c,b)=>
                      <option value={c} key={b}>{c}</option>
               )} 
          </optgroup>     
      </Select>  

        {/*<select name={api_Db} id="" onChange={(e)=>{
         //setApi_Db(e.target.value)
         e.preventDefault();
         handleSortByOrigin(e.target.value);
         }}>
          <option value="all">--All dogs--</option>
          <option value="api">Api dogs</option>
          <option value="db">Created dogs</option>
        </select>  */}

        <Select name={sort} id="" onChange={(e)=>{
         e.preventDefault();
         setSort(e.target.value)
         handleSortByOrder(e.target.value)
         }}>
          {/*<option value="none">--Sort by--</option>*/}
          <option value="a-z">A-z sort</option>
          <option value="z-a">Z-a sort</option>
          <option value="l-g">Lesser to greater weight</option>
          <option value="g-l">Greater to lesser weight</option>

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
            //onClose={props.onClose}
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

