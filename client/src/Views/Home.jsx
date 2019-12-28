import React, { Component } from 'react';
import SearchForm from '../Components/SearchForm';
import AddBook from '../Components/AddBook';
import BookElement from '../Components/BookElement';
import { Card  } from 'semantic-ui-react';

class Home extends Component {

state = { findBooks: [],
          allBooks: []
        };
    
findData = findBooks => {
  this.setState({ findBooks });
}

showAllData = allBooks => {
  this.setState({ allBooks });
}

render(){
  return (
    <>
      <SearchForm findData={this.findData} />
      {this.state.findBooks.map(book => {
        return (
        <Card color="blue" key={book._id}>
        <Card.Content>
          {"Title: " + book.title.toUpperCase() + "  *  Author: " + book.author.toUpperCase() + "  *  Year: " + book.year + "  *  Genre: " + book.genre.toUpperCase()}
        </Card.Content>       
        </Card>
      );
     })}
      <BookElement showAllData={this.showAllData}/>
      {this.state.allBooks.map(book => {
      return (
        <Card color="yellow" key={book._id}>
        <Card.Content>
            {"Title: " + book.title.toUpperCase() + " * Author: " + book.author.toUpperCase() + " * Year: " + book.year + " * Genre: " + book.genre.toUpperCase()} 
        </Card.Content>       
        </Card>
      );
     })}
      <AddBook />
    </>
  );
}
}

export default Home;
