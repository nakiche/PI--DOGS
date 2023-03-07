import React, { Component } from "react";
import { connect } from "react-redux";
import Dog from '../dog/Dog.jsx';
import  {getDogs}  from '../../actions/index.js';


export class Dogs extends Component {

    componentDidMount(){
        this.props.getDogs() 
    }

  render() {
   
    return (
     
         this.props.dogs && this.props.dogs.map((c,b)=>
             
             <Dog key={b}
              id={c.id}
              name={c.name}
              temperaments={c.Temperaments}
              image={c.image}
              weight={c.weight}
            //onClose={props.onClose}
           />
         )
          

    );
  }
}

function mapStateToProps(state){
    return{
        dogs:state.dogs,
        //moviesLoaded:state.moviesLoaded
    }
  
}

//función que permite al componente ejecutar action creators
//permitir al componente recibir las action creators en forma de props para utilizarlas
 function mapDispatchToProps(dispatch){
    return {
      getDogs:function(){
         dispatch(getDogs());
      }
   }
  }


export default connect(mapStateToProps,mapDispatchToProps)(Dogs);
//export default (ConnectedList);


// export default function Dogs(props) {

//    let { dogs } = props;
//    //console.log(props)
//    return (
      
//          dogs.map((c,b)=>
//              <Dog key={b}
//               id={c.id}
//               name={c.name}
//               temperaments={c.Temperaments}
//               image={c.image}
//               weight={c.weight}
//              //onClose={props.onClose}
//             />
//          )
      
//    );
// }
