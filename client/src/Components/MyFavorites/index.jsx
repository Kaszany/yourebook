import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
// import FavoritesBookCard from '../FavoritesBookCard';
import userContext from '../AuthLoader/UserContext';

class MyFavorites extends Component {
  static contextType = userContext;

  showFavorites = () => {
    if (this.context.favorites.length === 0) {
      alert('You dont have any favorite book');
    } else {
      this.props.showBooks(this.context.favorites);
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
