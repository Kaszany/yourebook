import React, { Component } from 'react';
import { Modal, Card } from 'semantic-ui-react';

import SearchForm from '../Components/SearchForm';
import AddBook from '../Components/AddBook';
import BookElement from '../Components/BookElement';
import BookCard from '../Components/BookCard';

class Home extends Component {
  state = { books: [], modalFindOpen: false, modalAllOpen: false, modalOneOpen: false };

  allData = books => {
    this.setState({ books });
  };

  handleOpen = () => this.setState({ modalFindOpen: true });

  handleClose = () => this.setState({ modalFindOpen: false });

  handleShowOpen = () => this.setState({ modalAllOpen: true });

  handleShowClose = () => this.setState({ modalAllOpen: false });

  render() {
    return (
      <>
        <SearchForm allData={this.allData} handleOpen={this.handleOpen} />
        <Modal size={'large'} open={this.state.modalFindOpen} onClose={this.handleClose}>
          <Modal.Content>
            <Card.Group itemsPerRow={3}>
              {this.state.books.map(book => {
                return <BookCard key={book._id} book={book} />;
              })}
            </Card.Group>
          </Modal.Content>
        </Modal>
        <BookElement allData={this.allData} handleShowOpen={this.handleShowOpen} />
        <Modal size={'large'} open={this.state.modalAllOpen} onClose={this.handleShowClose}>
          <Modal.Content>
            <Card.Group itemsPerRow={3}>
              {this.state.books.map(book => {
                return <BookCard key={book._id} book={book} />;
              })}
            </Card.Group>
          </Modal.Content>
        </Modal>
        <AddBook />
      </>
    );
  }
}

export default Home;
