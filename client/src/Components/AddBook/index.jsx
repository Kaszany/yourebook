import React, { Component } from 'react';
import { Button, Form, Input, Modal, Header } from 'semantic-ui-react';
import axios from 'axios';

class AddBook extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      author: '',
      year: '',
      genre: '',
      bookCover: null,
      PDF: null,
      modalOpen: false,
      request: '',
      endmessage: '',
      // jakoś podświetle jak bedzie error konkretny input
      borderColor: '',
    };
  }
  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleUpload = e => {
    const { name, files } = e.target;
    this.setState({
      [name]: files[0],
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { title, author, year, genre, bookCover, PDF } = this.state;
    const bookFormData = new FormData();
    bookFormData.set('title', title);
    bookFormData.set('author', author);
    bookFormData.set('year', year);
    bookFormData.set('genre', genre);
    bookFormData.set('bookCover', bookCover);
    bookFormData.set('PDF', PDF);

      axios({
      method: 'post',
      url: '/api/books',
      data: bookFormData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(res => {
        console.log(res.data);
        this.setState({
          endmessage: 'Success!',
        });
        console.log(this.state.request);
      })
      .catch(err => {
        this.setState({
          request: 'Something went wrong',
          endmessage: err.response.data.message,
        });
        console.log(err.response.data);
      });
  };

  render() {
    return (
      <Modal
        size={'mini'}
        trigger={
          <Button color="green" style={{ marginTop: '10px' }} onClick={this.handleOpen}>
            Add Book!
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header icon="book" content="Adding new book" />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit} style={{ padding: '5px' }}>
            <Form.Field>
              <Input placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <Input placeholder="Author" name="author" value={this.state.author} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <Input
                placeholder="Year"
                name="year"
                type="number"
                value={this.state.year}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Input placeholder="Genre" name="genre" value={this.state.genre} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <h6 style={{ margin: '2px' }}>Book cover image(JPEG/PNG)</h6>
              <Input type="file" name="bookCover" icon="file image" onChange={this.handleUpload} />
            </Form.Field>
            <Form.Field>
              <h6 style={{ margin: '2px' }}>PDF file</h6>
              <Input type="file" name="PDF" icon="file pdf" onChange={this.handleUpload} />
            </Form.Field>
            <Modal.Actions>
              <Button negative style={{ marginLeft: '0px' }} onClick={this.handleClose}>
                Leave
              </Button>
              <Button type="submit" positive icon="checkmark" labelPosition="right" content="Add" floated="right" />
              {this.state.endmessage === 'Success!' ? (
                <h5 style={{ color: 'green', display: 'flex', justifyContent: 'center' }}>{this.state.endmessage}</h5>
              ) : (
                <h5 style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>{this.state.endmessage}</h5>
              )}
            </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default AddBook;
