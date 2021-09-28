import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button} from 'react-bootstrap';
import axios from 'axios';
import ComponentCard from './ComponentCard';
import { withAuth0 } from '@auth0/auth0-react';

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      fruitArray:[],
    }
  }


  //===========================================componentDidMount======================

componentDidMount = async ()=>{

let url = await axios.get(`${process.env.REACT_APP_SERVER}/getfruit`)

await this.setState({
  fruitArray:url.data,
})

};

//=================================ADD FAVORITE FUNCTION================

addFavorite = async(itemObj)=>{ 

let url2= await axios.post(`${process.env.REACT_APP_SERVER}/addFavo?email=${this.props.auth0.user.email}`,itemObj);

await this.setState({

  fruitArray:url2.data,
})

}





















  render() {
    return (
      <>
        <h1>API Fruits</h1>

      <div>

        {this.state.fruitArray.length !==0 ? (this.state.fruitArray.map(item =>{

          return (
            
         <ComponentCard image={item.image} name={item.name} price={item.price} addFavorite={this.addFavorite}/>
   
            )
        }))

        :(console.log('errrror in geting data'))
        
      
      
      
      
      }
      </div>




      </>
    )
  }
}

export default withAuth0(Home);
