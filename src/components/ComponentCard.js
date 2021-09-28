import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button} from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class ComponentCard extends React.Component {

    addFavorite = async()=>{

   let itemObj={
        
        email:this.props.auth0.user.email,
        name:this.props.name,
        image:this.props.image,
        price:this.props.price,

    }
    this.props.addFavorite(itemObj)
    }

    render() {
        return (

            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={this.props.image} />
            <Card.Body>
              <Card.Title>{this.props.name}</Card.Title>
              <Card.Text>
                {this.props.price}
              </Card.Text>
              <Button variant="primary" onClick={this.addFavorite}>Add to Favorite</Button>
            </Card.Body>
          </Card>
        )

    }
}

export default withAuth0(ComponentCard);