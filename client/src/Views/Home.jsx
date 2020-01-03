import React, { Component } from 'react';
import { Modal, Card } from 'semantic-ui-react';

import SearchForm from '../Components/SearchForm';
import AddBook from '../Components/AddBook';
import BookElement from '../Components/BookElement';
import BookCard from '../Components/BookCard';
import LoginForm from '../Components/Login'
import RegisterForm from '../Components/Register'

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

	<div>
      	  <div className="ui segment" style={{marginLeft: '55%', display: 'flex'}}>
            <LoginForm />
            <RegisterForm />
        </div>
        <div className="ui segment">
        <img src='./bookstorm.jpg' alt='book in storm'/>
  
        </div>
      
      
        <div className="ui segment">
          <SearchForm />
        </div>
        
      </div>
      </>
    );



};

export default Home;
