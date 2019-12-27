import React, { Component } from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';

class BookElement extends Component {
  
    constructor() {
        super();
        this.state = {
            books: []
        };
      }


getBooks = async e => {
    try {
    e.preventDefault();
    const response = await fetch(`/api/books`);
    const data = await response.json();
    if (data.length === 0){
      alert('The library does not contain this book');
    }
    else{
      //data.length = 5; - gdy chcę ograniczyć ilość
      this.setState( {books: data});
    }
    } catch (error) {
    alert('The value is not allowed');
  }
  };

render(){
  return (
    <>  
     {this.state.books.map(book => {
      return (
        <Card color="yellow" key={book._id}>
        <Card.Content>
            {"Title: " + book.title.toUpperCase() + " * Author: " + book.author.toUpperCase() + " * Year: " + book.year + " * Genre: " + book.genre.toUpperCase()} 
        </Card.Content>       
        </Card>
      );
     })} 
     <Button className="ui button" color="yellow" onClick={this.getBooks}><Icon name='redo' />Show all books in the library!</Button>  
    </>
  );
}
}

export default BookElement;
