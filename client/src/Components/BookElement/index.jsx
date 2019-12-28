import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';

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
      this.props.showAllData(data);
    }
    } catch (error) {
    alert('The value is not allowed');
  }
  };

render(){
  return (
    <>   
     <Button className="ui button" color="yellow" onClick={this.getBooks}><Icon name='redo' />Show all books in the library!</Button>  
    </>
  );
}
}

export default BookElement;
