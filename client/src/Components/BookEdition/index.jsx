import React, { Component } from 'react';
import { Button, Modal, Form, Input, Icon, Select } from 'semantic-ui-react';
import axios from 'axios';const genreOptions = [
    { value: '', text: 'cancel this selection' },
    { value: 'romance', text: 'Romance' },
    { value: 'fantasy', text: 'Fantasy' },
    { value: 'horror', text: 'Horror' },
    { value: 'crime', text: 'Crime' },
    { value: 'thriller', text: 'Thriller' },
  ];class BookEdition extends Component {
  
     state = { 
        title: '',
        author: '',
        year: '',
        genre: '',
               
     };     handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      };      handleSubmit = async e => {
        e.preventDefault();
        const { title, author, year, genre, bookCover, PDF } = this.state;
        const bookFormData = new FormData();
        bookFormData.set('title', title);
        bookFormData.set('author', author);
        bookFormData.set('year', year);
        bookFormData.set('genre', genre);
        bookFormData.set('bookCover', bookCover);
        bookFormData.set('PDF', PDF);
    
        await axios({
          method: 'put',
          url: '/api/books',
          data: bookFormData,
          config: { headers: { 'Content-Type': 'multipart/form-data' } },
        })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      };    render() {
     return (
      
              
       
               
                <Modal
                size={'mini'}
                trigger={
                  <Button       
                  size="massive"
                  color="orange"
                  //icon="heart"
                  labelPosition="right"
                  label="Edit this book"
                  onClick={this.dupa}
                  //disabled = {this.state.disabled}
                  //floated="right"
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