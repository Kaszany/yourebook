import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

import userContext from '../AuthLoader/UserContext';

class AddFavorites extends Component {
  static contextType = userContext;

  constructor(props, context) {
    super(props, context);
    const { favorites } = this.context;
    const { id } = this.props.book;
    this.state = { isFavourite: favorites.includes(id) };
  }

  addToFavorites = async e => {
    try {
      const response = await axios.post(`/api/favourites?id=${this.props.book._id}`);

      this.setState({ isFavourite: true });
      const { favorites } = this.context;
      favorites.push(this.props.book.id);
    } catch (ex) {
      console.error(ex);
      alert('Book not added. Please try later.');
    }
  };

  removeFromFavorites = async e => {
    try {
      const response = await axios.delete(`/api/favourites?id=${this.props.book._id}`);

      this.setState({ isFavourite: false });
      const { favorites } = this.context;
      favorites.splice(favorites.indexOf(this.props.book.id), 1);
    } catch (ex) {
      console.error(ex);
      alert('Book not added. Please try later.');
    }
  };

  render() {
    if (this.state.isFavourite) {
      return (
        <>
          <Button
            size="massive"
            color="red"
            icon="undo alternate"
            labelPosition="right"
            label="Remove from favorites"
            onClick={this.removeFromFavorites}
            floated="right"
          />
        </>
      );
    } else {
      return (
        <>
          <Button
            size="massive"
            color="red"
            icon="heart"
            labelPosition="right"
            label="Add to favorites"
            onClick={this.addToFavorites}
            floated="right"
          />
        </>
      );
    }
  }
}

export default AddFavorites;
