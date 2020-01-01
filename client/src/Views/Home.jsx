import React, { Component } from 'react';
import SearchForm from '../Components/SearchForm';
import AddBook from '../Components/AddBook';
import BookElement from '../Components/BookElement';
import { Card, Modal, Button  } from 'semantic-ui-react';


class Home extends Component {


state = { findBooks: [],
          allBooks: [],
          modalFindOpen: false,
          modalAllOpen: false,
          modalOneOpen: false,
        };
    
findData = findBooks => {
  this.setState({ findBooks });
}

showAllData = allBooks => {
  this.setState({ allBooks });
}

handleOpen = () => this.setState({modalFindOpen: true});

handleClose = () => this.setState({ modalFindOpen: false});

handleShowOpen = () => this.setState({modalAllOpen: true});

handleShowClose = () => this.setState({ modalAllOpen: false});

handleOneOpen = () => this.setState({ modalOneOpen: true});

handleOneClose = () => this.setState({ modalOneOpen: false});

render(){
  return (
    <>
      <SearchForm findData={this.findData} handleOpen={this.handleOpen}/>
      <Modal
        size={'mini'}
        open={this.state.modalFindOpen}
        onClose={this.handleClose}
      >
        <Modal.Content>
        {this.state.findBooks.map( book => {
        return (   
        <Card color="blue" key={book._id}>
        <Card.Content>
          {"Title: " + book.title.toUpperCase() + "  *  Author: " + book.author.toUpperCase() + "  *  Year: " + book.year + "  *  Genre: " + book.genre.toUpperCase()} 
          <Modal.Actions>
          <Button type="submit" color="blue" icon="redo" labelPosition="right" content="Show me this book" floated="right" onClick={this.handleOneOpen}/>
          </Modal.Actions>
          <Modal
          size={'large'}
          open={this.state.modalOneOpen}
          onClose={this.handleOneClose}
          > 
          <Modal.Content>
          {"Title: " + book.title.toUpperCase() + " ||| Author: " + book.author.toUpperCase() + " ||| Year: " + book.year + " ||| Genre: " + book.genre.toUpperCase() + " ||| Book Cover: " + book.bookCover + " ||| PDF: " + book.PDF + " ||| Mongo Book ID: " + book._id}
          </Modal.Content>
          </Modal>
        </Card.Content>       
        </Card> 
      ); 
     })}
        </Modal.Content>
      </Modal>
      <BookElement showAllData={this.showAllData} handleShowOpen={this.handleShowOpen}/>
      <Modal
        size={'mini'}
        open={this.state.modalAllOpen}
        onClose={this.handleShowClose}
      >
      <Modal.Content>
      {this.state.allBooks.map(book => {
      return (
        <Card color="yellow" key={book._id}>
        <Card.Content>
          {"Title: " + book.title.toUpperCase() + " * Author: " + book.author.toUpperCase() + " * Year: " + book.year + " * Genre: " + book.genre.toUpperCase()} 
          <Modal.Actions>
          <Button type="submit" color="yellow" icon="redo" labelPosition="right" content="Show me this book" floated="right" onClick={this.handleOneOpen}/>
          </Modal.Actions>
          <Modal
          size={'large'}
          open={this.state.modalOneOpen}
          onClose={this.handleOneClose}
          > 
          <Modal.Content>
          {"Title: " + book.title.toUpperCase() + " ||| Author: " + book.author.toUpperCase() + " ||| Year: " + book.year + " ||| Genre: " + book.genre.toUpperCase() + " ||| Book Cover: " + book.bookCover + " ||| PDF: " + book.PDF + " ||| Mongo Book ID: " + book._id}
          </Modal.Content>
          </Modal>
        </Card.Content>       
        </Card>
      );
     })}
      </Modal.Content>
      </Modal>
      <AddBook />
    </>
  );
}
}

export default Home;
