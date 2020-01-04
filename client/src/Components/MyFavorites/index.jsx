import React, { Component } from 'react';
import { Button, Modal, Card } from 'semantic-ui-react';
import BookCard from '../BookCard';

class MyFavorites extends Component {
  
    state = {modalFavoritesOpen: false};

    showFavorites = () => {
    if (this.props.favorites.length === 0){
        alert('You dont have any favorite book');
        }else{
        console.log(this.props.favorites)
        this.setState({ modalFavoritesOpen: true });
        }
    };

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
                  return <BookCard key={book._id} book={book} favorites={this.state.favorites}/>;
                })}
              </Card.Group>
            </Modal.Content>
          </Modal>   
    </>
    );
  }
}

export default MyFavorites;