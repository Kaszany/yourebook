import React, { Component } from 'react';
import SearchForm from '../Components/SearchForm';
import AddBook from '../Components/AddBook';
import BookElement from '../Components/BookElement';
import { Card, Modal, Button  } from 'semantic-ui-react';

class Home extends Component {

state = { findBooks: [],
          allBooks: [],
          modalOpen: false,
        };
    
findData = findBooks => {
  this.setState({ findBooks });
}

showAllData = allBooks => {
  this.setState({ allBooks });
}

handleOpen = () => this.setState({ modalOpen: true });

handleClose = () => this.setState({ modalOpen: false });

render(){
  return (
    <>
      <SearchForm findData={this.findData} handleOpen={this.handleOpen}/>
      <Modal
        size={'mini'}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Content>
      {this.state.findBooks.map(book => {
        return (
        <Card color="blue" key={book._id}>
        <Card.Content>
          {"Title: " + book.title.toUpperCase() + "  *  Author: " + book.author.toUpperCase() + "  *  Year: " + book.year + "  *  Genre: " + book.genre.toUpperCase()}
        </Card.Content>       
        </Card>
      );
     })}
       </Modal.Content>
      </Modal>
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
