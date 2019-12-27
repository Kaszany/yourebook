import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';

class Books extends Component {
  
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
      console.log(data);
      const end = {text: " "};
      for (var i = 0; i < data.length; i++){ 
      end.text = "Title: " + 
      data[i].title.toUpperCase() + 
      " * Author: " + data[i].author.toUpperCase() +
      " * Genre: " + data[i].genre.toUpperCase() +
      " * " + end.text;
      this.setState( {books: data});  
      }
      
    }
    } catch (error) {
    alert('The value is not allowed');
  }
  };

render(){
  return (
    <>
     <Button className="ui button" color="green" onClick={this.getBooks}>Show me all books</Button>
     {this.state.books.map(book => {
      return (
        <Card>
        <Card.Content>{"Title: " + book.title.toUpperCase() + " * Author: " + book.author.toUpperCase()}</Card.Content>       
      </Card>
      );
     })} 
     
      
    </>
  );
}
}

export default Books;
