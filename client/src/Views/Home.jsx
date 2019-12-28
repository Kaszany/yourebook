import React, { Component } from 'react';
import SearchForm from '../Components/SearchForm';
import AddBook from '../Components/AddBook';
import BookElement from '../Components/BookElement';
import { Card  } from 'semantic-ui-react';

class Home extends Component {

state = { findBooks: [] };
    
changeFindData = findBooks => {
  this.setState({ findBooks });
}

render(){
  return (
    <>
      <SearchForm changeFindData={this.changeFindData} />
      {this.state.findBooks.map(book => {
        return (
        <Card color="blue" key={book._id}>
        <Card.Content>
          {"Title: " + book.title.toUpperCase() + "  *  Author: " + book.author.toUpperCase() + "  *  Year: " + book.year + "  *  Genre: " + book.genre.toUpperCase()}
        </Card.Content>       
        </Card>
      );
     })}
      <BookElement />
      <AddBook />
    </>
  );
}
}

export default Home;
