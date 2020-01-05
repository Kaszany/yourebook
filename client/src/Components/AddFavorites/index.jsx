import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class AddFavorites extends Component {
  
    state = { disabled: false,
              isBookThere: 1
    };

    addToFavorites = async (e) => { 
         for (var i = 0; i < this.props.favorites.length; i++ ){
         if (this.props.favorites[i]._id === this.props.book._id){
             alert("This book is already in favorites");
             this.setState({disabled:true})
             await this.setState( {isBookThere: 2} )
         }
        }
        if (this.state.isBookThere === 1){    
        this.props.favorites.push(this.props.book);
        this.setState({disabled:true})
        }
    };

    render() {
     return (
        <>
              <Button
                size="massive"
                color="red"
                icon="heart"
                labelPosition="right"
                label="Add to favorites"
                onClick={this.addToFavorites}
                disabled = {this.state.disabled}
                floated="right"
              />   
        </>
    );
}
}

export default AddFavorites;