import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class AddFavorites extends Component {
  
    constructor() {
        
        super();
        this.state = {

            favorites: [],
            disabled: false

        };

      }



      addToFavorites = () => {
          
          console.log("Twoje ulubiona tablica to:")
          console.log(this.state.favorites)
          console.log("Dodajesz:")
          console.log(this.props.book)
          this.setState({favorites: this.state.favorites.push(this.props.book)});
          console.log("Twoje ulubiona tablica po zmianach to:")
          console.log(this.state.favorites)
          this.setState({disabled:true})
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