import React, { Component } from 'react';
import SearchForm from '../Components/SearchForm';
import AddBook from '../Components/AddBook';
import BookElement from '../Components/BookElement';
import { Card, Modal, Button } from 'semantic-ui-react';
import axios from 'axios';

class Home extends Component {
  state = { findBooks: [], allBooks: [], modalFindOpen: false, modalAllOpen: false, PDF: '' };

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

  handleDownload = () => {
    axios({
      method: 'get',
      url: `/api/PDFs.files/9628214f89f564f8d86dca102e6646e2.pdf`,
      responseType: 'blob',
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'testpdf');
      document.body.appendChild(link);
      link.click();
    });
  };
  render() {
    return (
      <>
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
                    <Button icon="file pdf" color="red" onClick={this.handleDownload} floated="right" />
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
                    <Button icon="file pdf" color="red" onClick={this.handleDownload} floated="right" />
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
