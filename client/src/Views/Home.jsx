import React, { Component } from 'react';
import { Modal, Card, Button, Menu } from 'semantic-ui-react';
import LoginForm from '../Components/Login/Auth'
import RegisterForm from '../Components/Login/Register'
import SearchForm from '../Components/SearchForm';
import AddBook from '../Components/AddBook';
import BookElement from '../Components/BookElement';
import BookCard from '../Components/BookCard';
import NavBar from '../Components/NavBar';
import { Link } from 'react-router-dom';

class Home extends Component {
  state = { findBooks: [], allBooks: [], modalFindOpen: false, modalAllOpen: false, modalOneOpen: false };

  findData = findBooks => {
    this.setState({ findBooks });
  };

  showAllData = allBooks => {
    this.setState({ allBooks });
  };

  removeBook = id => {
    const filteredBooks = this.state.allBooks.filter(book => book._id !== id);
    this.setState({ allBooks: filteredBooks });
    if(filteredBooks.length === 0) {
      alert('The library does not contain any book')
    }

    const filteredFindBooks = this.state.findBooks.filter(book => book._id !== id);
    this.setState({ findBooks: filteredFindBooks});
    if(filteredFindBooks.length === 0) {
      alert('The library does not contain this book')
    }
  };

  handleOpen = () => this.setState({ modalFindOpen: true });

  handleClose = () => this.setState({ modalFindOpen: false });

  handleShowOpen = () => this.setState({ modalAllOpen: true });

  handleShowClose = () => this.setState({ modalAllOpen: false });

  handleLogOut = e => {
    localStorage.removeItem('email');
    localStorage.removeItem('status');
}

  render() {
    return (
      <>
      
        <div className="ui rail" style={{height: '50px', width:'100%', position: 'fixed', top: '0', left: '0', zIndex: '-1'}}>
        <img src='./bookstorm_crop.jpg' alt='book in storm' style={{width:'100%'}}/></div>
        <NavBar />
	      <div style={{marginTop:'215px', backgroudColor: 'white'}}>
      	  <div style={{marginLeft: '60%', display: 'flex', justifyContent: 'space-evenly'}}>
            <LoginForm />
            <RegisterForm />
            <Button 
            className="ui yellow button big"
            name='logout'
            // active={activeItem === 'logout'}
            onClick={this.handleLogOut}
            as={Link} to='/login'
            ><i  className="external alternate icon"></i>Log out</Button>
          </div>

          {/* <div className="ui segment">
            <img src='./bookstorm.jpg' alt='book in storm' style={{width:'100%'}}/>
          </div> */}
        </div>
      
        <div style={{backgroundColor: 'white', marginTop: '5%'}}>
        <SearchForm findData={this.findData} handleOpen={this.handleOpen} />
      <div style={{marginLeft:'450px', width: '100%', position: 'relative', top: '-55px'}}>
       
        <BookElement showAllData={this.showAllData} handleShowOpen={this.handleShowOpen} />
        <AddBook  />
        </div>

        <Modal size={'large'} open={this.state.modalFindOpen} onClose={this.handleClose}>
          <Modal.Content>
            <Card.Group itemsPerRow={3}>
              {this.state.findBooks.map(book => {
                return <BookCard key={book._id} book={book} removeBook={removeBook}/>;
              })}
            </Card.Group>
          </Modal.Content>
        </Modal>
        
        <Modal size={'large'} open={this.state.modalAllOpen} onClose={this.handleShowClose}>
          <Modal.Content>
            <Card.Group itemsPerRow={3}>
              {this.state.allBooks.map(book => {
                return <BookCard key={book._id} book={book} removeBook={removeBook} />;
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
