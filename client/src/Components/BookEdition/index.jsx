import React, { Component } from 'react';
import { Button, Modal, Form, Input, Icon, Select } from 'semantic-ui-react';
import axios from 'axios';

const genreOptions = [
    { value: '', text: 'cancel this selection' },
    { value: 'romance', text: 'Romance' },
    { value: 'fantasy', text: 'Fantasy' },
    { value: 'horror', text: 'Horror' },
    { value: 'crime', text: 'Crime' },
    { value: 'thriller', text: 'Thriller' },
  ];
  
  class BookEdition extends Component {
  
     state = { 
        title: this.props.book.title,
        author: this.props.book.author,
        year: this.props.book.year,
        genre: this.props.book.genre,
        modalOpen: false,             
     };    

     handleOpen = () => this.setState({ modalOpen: true });

     handleClose = () => this.setState({ modalOpen: false });
     
     handleChange = (e, { name, value }) => {
      this.setState({ [name]: value });
     };      
       
     handleSubmit = async e => {
      e.preventDefault();
      const id = this.props.book._id;
      const { title, author, year, genre } = this.state;

        const content = {
          'title': title,
          'author': author,
          'year': year,
          'genre': genre        
        }

        let req = {
        url: `/api/books/${id}`,
        method: 'PUT',
        data: content
        }
      
        axios(req)
        this.handleClose();  
      }
      
       render() {
         return (
      

            <Modal
              size={'mini'}
              trigger={
                  <Button       
                  size="massive"
                  icon="redo"
                  color="orange"
                  labelPosition="left"
                  label="Edit this book"
                  onClick={this.handleOpen}
                  floated="left"
                  />
                }
              open={this.state.modalOpen}
              onClose={this.handleClose}
            >
              <Modal.Content>
              <Form>
        <Form.Field>
          <Icon color="blue" name="hand point down outline" />
          <Icon color="blue" name="keyboard" />
          <Input placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <Icon color="blue" name="hand point down outline" />
          <Icon color="blue" name="keyboard" />
          <Input placeholder="Author" name="author" value={this.state.author} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <Icon color="blue" name="hand point down outline" />
          <Icon color="blue" name="keyboard" />
          <Input placeholder="Year" name="year" type="number" value={this.state.year} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <Icon color="blue" name="hand point down outline" />
          <Icon color="blue" name="list alternate" />
          <Select
            placeholder="Genre"
            name="genre"
            value={this.state.genre}
            onChange={this.handleChange}
            options={genreOptions}
          />
        </Form.Field>
        <Button className="ui button" color="blue" onClick={this.handleSubmit}>
          <Icon name="redo" /> Save changes
        </Button>
      </Form>
      </Modal.Content>
      </Modal> 
              
     
    );
}
}export default BookEdition;