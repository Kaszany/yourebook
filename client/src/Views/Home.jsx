import React, { Component } from 'react';
import SearchForm from '../Components/SearchForm';
import AddBook from '../Components/AddBook';
import BookElement from '../Components/BookElement';
import { Card, Modal, Button } from 'semantic-ui-react';
import axios from 'axios';
import NavBar from '../Components/NavBar';


class Home extends Component {
  state = { findBooks: [], allBooks: [], modalFindOpen: false, modalAllOpen: false, PDF: '',};

  findData = findBooks => {
    this.setState({ findBooks });
  };

  showAllData = allBooks => {
    this.setState({ allBooks });
  };

  handleOpen = () => this.setState({ modalFindOpen: true });

  handleClose = () => this.setState({ modalFindOpen: false });

  handleShowOpen = () => this.setState({ modalAllOpen: true });

  handleShowClose = () => this.setState({ modalAllOpen: false });

  render() {
    return (
      <>
        <NavBar />
        <SearchForm findData={this.findData} handleOpen={this.handleOpen} />
        <Modal size={'mini'} open={this.state.modalFindOpen} onClose={this.handleClose}>
          <Modal.Content>
            {this.state.findBooks.map(book => {
              return (
                <Card color="blue" key={book._id}>
                  <Card.Content>
                    {'Title: ' +
                      book.title.toUpperCase() +
                      '  *  Author: ' +
                      book.author.toUpperCase() +
                      '  *  Year: ' +
                      book.year +
                      '  *  Genre: ' +
                      book.genre.toUpperCase() +
                      '  *  PDF: ' +
                      book.PDF}
                  </Card.Content>
                </Card>
              );
            })}
          </Modal.Content>
        </Modal>
        <BookElement showAllData={this.showAllData} handleShowOpen={this.handleShowOpen} />
        <Modal size={'mini'} open={this.state.modalAllOpen} onClose={this.handleShowClose}>
          <Modal.Content>
            {this.state.allBooks.map(book => {
              return (
                <Card color="yellow" key={book._id}>
                  <Card.Content>
                    {'Title: ' +
                      book.title.toUpperCase() +
                      '  *  Author: ' +
                      book.author.toUpperCase() +
                      '  *  Year: ' +
                      book.year +
                      '  *  Genre: ' +
                      book.genre.toUpperCase() +
                      'PDF' +
                      book.PDF}
                    <Button
                      icon="file pdf"
                      color="red"
                      onClick={this.handleDownload}
                      style={{ marginTop: '20px' }}
                      floated="right"
                    />
                  </Card.Content>
                </Card>
              );
            })}
          </Modal.Content>
        </Modal>
        <AddBook />
      </>
    );
  }
}

export default Home;
