import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class AddFavorites extends Component {
  
    state = { disabled: false };

    addToFavorites = () => { 
        // for (var i = 0; i < this.props.favorites.length; i++ ){
        // if (this.props.favorites[i]._id === this.props.book._id){
        //     alert("dupa");
        // }
        // else{
        // console.log(this.props.book._id);    
        this.props.favorites.push(this.props.book);
        this.setState({disabled:true})
        // }
        // }
    };

   render() {
     return (
        <>
              <Button
                color="red"
                icon="heart"
                content="Add to favorites"
                onClick={this.addToFavorites}
                disabled = {this.state.disabled}
                floated="right"
              />   
        </>
    );
}
}

export default AddFavorites;