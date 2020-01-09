import React, { Component } from 'react';
import { Button, Form, Input, Modal, Icon, Select } from 'semantic-ui-react';
import axios from 'axios';
import genreOptions from '../../utils/genreOptions';
import '../../App.css';
import getToken from '../../utils/getToken';
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

  handleChange = (e, { name, value }) => {
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
    const headers = {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': getToken(),
    };
    axios({
      method: 'post',
      url: '/api/books',
      data: bookFormData,
      headers: headers,
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
          endmessage: err.response.data.message,
        });
      });
  };

  render() {
    return (
      <Modal
        size={'mini'}
        trigger={
          <Button className="olive ui button big" style={{ marginTop: '10px', marginLeft:'80px', width: '250px'}} onClick={this.handleOpen} icon="plus"
          labelPosition="right"
          content="Add book"/>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        {/* <Header icon="book" content="Adding new book" /> */}
        <Modal.Content>
          <Form onSubmit={this.handleSubmit} style={{ padding: '5px' }}>
            <Form.Field>
              <div className="ui labeled input">
                <label className="ui right pointing label" style={{width: '40px'}}><i className="book icon"></i></label>
                <Input placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} />
              </div>
            </Form.Field>
            <Form.Field>
              <div className="ui labeled input">
                <label className="ui right pointing label" style={{width: '40px'}}><i className="user icon"></i></label>
                <Input placeholder="Author" name="author" value={this.state.author} onChange={this.handleChange} />
              </div>
            </Form.Field>
            <Form.Field>
              <div className="ui labeled input">
                <label className="ui right pointing label" style={{width: '40px'}}><i className="calendar check out icon"></i></label>
                <Input
                placeholder="Year"
                name="year"
                type="number"
                value={this.state.year}
                onChange={this.handleChange}
                />
              </div>
            </Form.Field>
            <Form.Field>
              <div className="ui labeled input">
                <label className="ui right pointing label" style={{ width: '40px' }}>
                  <i className="list alternate outline icon"></i>
                </label>
                <Select
                  style={{ width: '268px' }}
                  placeholder="Genre"
                  name="genre"
                  value={this.state.genre}
                  onChange={this.handleChange}
                  options={genreOptions}
                />
              </div>
            </Form.Field>
            <Form.Field>
              <h5 style={{ margin: '10px 0px 6px 0px' }}>Cover image (JPEG/PNG)</h5>
              <Input type="file" name="bookCover" icon="file image" onChange={this.handleUpload} />
            </Form.Field>
            <Form.Field>
              <h5 style={{ margin: '10px 0px 6px 0px' }}>PDF file</h5>
              <Input type="file" name="PDF" icon="file pdf" onChange={this.handleUpload} />
            </Form.Field>
            <Modal.Actions>
              <Button className="orange ui button" onClick={this.handleClose} style={{marginLeft:'0px'}}><Icon name='external alternate' />
                Leave
              </Button>
              <Button className="olive ui button" type="submit" floated="right" ><Icon name='plus' />Add book</Button>
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