import React, { Component } from 'react';
import { Button, Modal, Card } from 'semantic-ui-react';
import FavoritesBookCard from '../FavoritesBookCard';

class MyFavorites extends Component {
  
    state = {modalFavoritesOpen: false};

    showFavorites = () => {
    if (this.props.favorites.length === 0){
        alert('You dont have any favorite book');
        }else{
        this.setState({ modalFavoritesOpen: true });
        }
    };

    modalFavoritesClose = () => {
    this.setState({ modalFavoritesOpen: false });   
    }


    handleFavoritesClose = () => this.setState({ modalFavoritesOpen: false });

    render() {
     return (
    <>
            <Button
                color="red"
                icon="heart"
                content="My Favorites"
                onClick={this.showFavorites}
              />
            <Modal size={'large'} open={this.state.modalFavoritesOpen} onClose={this.handleFavoritesClose}>
            <Modal.Content>
              <Card.Group itemsPerRow={3}>
                {this.props.favorites.map(book => {
                  return <FavoritesBookCard key={book._id} book={book} modalFavoritesClose={this.modalFavoritesClose}  favorites={this.props.favorites}/>;
                })}
              </Card.Group>
            </Modal.Content>
          </Modal>   
    </>
    );
  }
}

export default MyFavorites;