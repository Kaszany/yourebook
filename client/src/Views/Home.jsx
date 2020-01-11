import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Card, Button, Icon, Container } from 'semantic-ui-react';

import SearchForm from '../Components/SearchForm';
import AddBook from '../Components/AddBook';
import MyFavorites from '../Components/MyFavorites';
import BookElement from '../Components/BookElement';
import BookCard from '../Components/BookCard';

class Home extends Component {
  state = {
    books: [],
    modalIsOpen: false,
  };

  showBooks = books => {
    this.setState({ modalIsOpen: true, books });
  };

  removeBook = id => {
    const filteredBooks = this.state.books.filter(book => book._id !== id);
    this.setState({ books: filteredBooks });
  };

  // handleOpen = () => this.setState({ modalIsOpen: true });

  handleClose = () => this.setState({ modalIsOpen: false });

  handleLogOut = e => {
    localStorage.removeItem('email');
    localStorage.removeItem('status');
  };

  render() {
    return (
      <>
        <div
          className="ui rail"
          style={{
            height: '200px',
            width: '100%',
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: '-1',
            borderColor: 'orange',
            border: '10px',
          }}
        >
          <div className="segment-background"></div>
          <div className="lightning-background flashit">
            <h1 className="logo">BOOKSTORM</h1>
            <Icon name="bolt" size="massive"></Icon>
          </div>
        </div>
        <div style={{ marginTop: '215px' }}>
          <div style={{ marginLeft: '60%', display: 'flex', justifyContent: 'space-evenly' }}>
            <Button
              className="ui yellow button big"
              name="logout"
              // active={activeItem === 'logout'}
              onClick={this.handleLogOut}
              as={Link}
              to="/login"
            >
              <i className="external alternate icon"></i>Log out
            </Button>
            <MyFavorites showBooks={this.showBooks} />
          </div>
        </div>
        <Container>
          <div style={{ marginTop: '5%' }}>
            <SearchForm showBooks={this.showBooks} handleOpen={this.handleOpen} />
            <div style={{ marginLeft: '450px', width: '100%', position: 'relative', top: '-55px' }}>
              <BookElement showBooks={this.showBooks} />
              <AddBook />
            </div>

            <Modal size={'large'} open={this.state.modalIsOpen} onClose={this.handleClose}>
              <Modal.Content>
                <Card.Group itemsPerRow={3}>
                  {this.state.books.map(book => {
                    return <BookCard key={book._id} book={book} removeBook={this.removeBook} />;
                  })}
                </Card.Group>
              </Modal.Content>
            </Modal>
          </div>
        </Container>
      </>
    );
  }
}

export default Home;
