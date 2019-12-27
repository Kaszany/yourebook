import React, { Component } from 'react';
import SearchForm from '../Components/SearchForm';
import AddBook from '../Components/AddBook';
import BookElement from '../Components/BookElement';

class Home extends Component {

render(){
  return (
    <>
      <SearchForm />
      <BookElement />
      <AddBook />
    </>
  );
}
}

export default Home;
