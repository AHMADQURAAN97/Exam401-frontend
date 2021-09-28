import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button,Modal,Form} from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';



class FavFruit extends React.Component {


constructor(props) {
  super(props);

  this.state = {
    favoriteFruitArray:[],
    showModalForm: false,
    selectedFruit:{},
  }
}

//==================================get favorite data====================

  componentDidMount = async ()=>{

    let url = await axios.get(`${process.env.REACT_APP_SERVER}/getFavoriteFruite?email=${this.props.auth0.user.email}`)
    
    await this.setState({
      favoriteFruitArray:url.data
    })
    console.log('dsfsdfsdf',this.state.favoriteFruitArray)
    }

//============================DELETE FAVORITE======================

   deleteFavorite = async (fruitID)=>{ 

    let url = await axios.delete(`${process.env.REACT_APP_SERVER}/deletefav/${fruitID}?email=${this.props.auth0.user.email}`)
  
    this.setState({
      favoriteFruitArray:url.data,
    }) 
  }

//=========================Update favorite==========================

updateFavorite = async(fruitID)=>{ 

  await this.setState({
    showModalForm:false,
  })
  
let fruitChoosen=this.state.favoriteFruitArray.find(item =>{

return  item._id === fruitID;

});

 await this.setState({
  selectedFruit:fruitChoosen,
  showModalForm:true,

})
console.log('vvvvvvvvvv',this.state.selectedFruit)
}



updateFavoriteForm = async(e)=>{ 

  e.preventDefault();

  let itemObjj = {

    name:e.target.name.value,
    image:e.target.image.value, 
    price:e.target.price.value, 
    email:this.props.auth0.user.email

  }



  let fruitID=this.state.selectedFruit._id
let url = await axios.put(`${process.env.REACT_APP_SERVER}/updateFruit/${fruitID}`,itemObjj)

await this.setState({

  favoriteFruitArray:url.data
})

}

handleClose = async () => {

  await this.setState({
      showModalForm:false,
  })
}

  render() {
    return(
      <>
        <h1>My Favorite Fruits</h1>

        <div>
        
        {this.state.favoriteFruitArray.length !==0 ? (

          this.state.favoriteFruitArray.map(item =>{
 
            return (
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                {item.price}
              </Card.Text>
              <Button variant="primary" onClick={()=>this.deleteFavorite(item._id)}>Delete</Button>
              <Button variant="primary" onClick={()=>this.updateFavorite(item._id)}>Update</Button>

            </Card.Body>
          </Card>

)
          })
        )
        
        
        
        
        :(console.log('error in getting add favorite'))
        
        }
        </div>


        {this.state.showModalForm && 

       <Modal show={this.state.showModalForm} onHide={this.handleClose}>
       <Modal.Header closeButton>
         <Modal.Title>Update Fruit Favorite</Modal.Title>
       </Modal.Header>








       <Form onSubmit={this.updateFavoriteForm}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" name="name" defaultValue={this.state.selectedFruit.name} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Photo</Form.Label>
    <Form.Control type="text" name="image" defaultValue={this.state.selectedFruit.image} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Instruction</Form.Label>
    <Form.Control type="text" name="price" defaultValue={this.state.selectedFruit.price} />
  </Form.Group>
  
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>









       <Modal.Footer>
         <Button variant="secondary" onClick={this.handleClose}>
           Close
         </Button>
        
       </Modal.Footer>
     </Modal>
      
        }
      </>
    )
  }
}

export default withAuth0(FavFruit);
