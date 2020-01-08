import React, { Component } from 'react';
import { Modal, Card } from 'semantic-ui-react';
import LoginForm from '../Components/Login/Auth'
import RegisterForm from '../Components/Login/Register'
import SearchForm from '../Components/SearchForm';
import AddBook from '../Components/AddBook';
import BookElement from '../Components/BookElement';
import BookCard from '../Components/BookCard';
import NavBar from '../Components/NavBar';

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

  render() {
    return (
      <>
        <NavBar />
          <div className="ui segment">
            <img src='./bookstorm.jpg' alt='book in storm' style={{width:'100%'}}/>
          </div>
      
        <div>
        <SearchForm findData={this.findData} handleOpen={this.handleOpen} />
      <div style={{marginLeft:'450px', width: '100%', position: 'relative', top: '-55px'}}>
       
        <BookElement showAllData={this.showAllData} handleShowOpen={this.handleShowOpen} />
        <AddBook  />
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
  };

};

export default Home;
