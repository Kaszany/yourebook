import React, { Component } from 'react';
import { Modal, Card } from 'semantic-ui-react';

import SearchForm from '../Components/SearchForm';
import AddBook from '../Components/AddBook';
import BookElement from '../Components/BookElement';
import BookCard from '../Components/BookCard';
import LoginForm from '../Components/Login/Auth'
import RegisterForm from '../Components/Login/Register'

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

	      <div style={{marginTop:'10px'}}>
      	  <div className="ui segment" style={{marginLeft: '70%', display: 'flex', justifyContent: 'space-evenly'}}>
            <LoginForm />
            <RegisterForm />
          </div>

          <div className="ui segment">
            <img src='./bookstorm.jpg' alt='book in storm' style={{width:'100%'}}/>
          </div>
        </div>
      
        <div>
          <SearchForm findData={this.findData} handleOpen={this.handleOpen} />
          <Modal size={'large'} open={this.state.modalFindOpen} onClose=  {this.handleClose}>
            <Modal.Content>
              <Card.Group itemsPerRow={3}>
                {this.state.findBooks.map(book => {
                  return <BookCard key={book._id} book={book} />;
                })}
              </Card.Group>
            </Modal.Content>
          </Modal>
          <BookElement showAllData={this.showAllData} handleShowOpen= {this.handleShowOpen} />
          <Modal size={'large'} open={this.state.modalAllOpen} onClose= {this.handleShowClose}>
            <Modal.Content>
              <Card.Group itemsPerRow={3}>
                {this.state.allBooks.map(book => {
                  return <BookCard key={book._id} book={book} />;
                })}
              </Card.Group>
            </Modal.Content>
          </Modal>
          <AddBook />
        </div>
      </>
    );
  };

};

export default Home;
