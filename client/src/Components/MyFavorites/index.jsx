import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import userContext from '../AuthLoader/UserContext';

class MyFavorites extends Component {
  static contextType = userContext;

  showFavorites = async () => {
    if (this.context.favorites.length === 0) {
      alert('You dont have any favorite book');
    } else {
      const books = await axios.get(`/api/favourites`);
      console.log(books.data);
      this.props.showBooks(books.data);
    }
  };

  render() {
    return (
      <>
        <Button color="red" icon="heart" content="My Favorites" onClick={this.showFavorites} />
      </>
    );
  }
}

export default MyFavorites;
