import React, { Component } from 'react';
import { Modal, Card, Icon } from 'semantic-ui-react';
import SearchForm from '../Components/SearchForm';
import AddBook from '../Components/AddBook';
import BookElement from '../Components/BookElement';
import BookCard from '../Components/BookCard';
import NavBar from '../Components/NavBar';
import '../App.css';
class Home extends Component {
  state = { findBooks: [], allBooks: [], modalFindOpen: false, modalAllOpen: false, modalOneOpen: false };

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

  getToken = () => {
    if (!localStorage.getItem('status')) {
      return '';
    } else return localStorage.getItem('status');
  };

  render() {
    return (
      <>
        <NavBar />
        <div className="ui segment">
          <div className="segment-background"></div>
          <div className="lightning-background flashit">
            <h1 className='logo'>BOOKSTORM</h1>
            <Icon name="bolt" size="massive"></Icon>
          </div>
        </div>

        <div>
          <SearchForm findData={this.findData} handleOpen={this.handleOpen} />
          <div style={{ marginLeft: '450px', width: '100%', position: 'relative', top: '-55px' }}>
            <BookElement showAllData={this.showAllData} handleShowOpen={this.handleShowOpen} />
            <AddBook />
          </div>

          <Modal size={'large'} open={this.state.modalFindOpen} onClose={this.handleClose}>
            <Modal.Content>
              <Card.Group itemsPerRow={3}>
                {this.state.findBooks.map(book => {
                  return <BookCard key={book._id} book={book} />;
                })}
              </Card.Group>
            </Modal.Content>
          </Modal>
          <Modal size={'large'} open={this.state.modalAllOpen} onClose={this.handleShowClose}>
            <Modal.Content>
              <Card.Group itemsPerRow={3}>
                {this.state.allBooks.map(book => {
                  return <BookCard key={book._id} book={book} />;
                })}
              </Card.Group>
            </Modal.Content>
          </Modal>
        </div>
      </>
    );
  }
}

export default Home;
