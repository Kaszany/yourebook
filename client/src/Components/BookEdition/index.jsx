import React, { Component } from 'react';
import { Button, Modal, Form, Input, Icon, Select, Header } from 'semantic-ui-react';
import axios from 'axios';
import getToken from '../../utils/getToken';

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
    const headers = {
      'x-auth-token': getToken(),
    };

    const content = {
      title: title,
      author: author,
      year: year,
      genre: genre,
    };

    let req = {
      url: `/api/books/${id}`,
      method: 'PUT',
      data: content,
      headers: headers,
    };

    axios(req).catch(err => {
      console.log(err);
    });
    this.handleClose();
  };

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
            label="Edit book"
            onClick={this.handleOpen}
            style={{ marginLeft: '1px' }}
            floated="left"
            disabled={this.props.disabled}
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
              <Input
                placeholder="Year"
                name="year"
                type="number"
                value={this.state.year}
                onChange={this.handleChange}
              />
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
          </Form>
        </Modal.Content>
        <Modal
          trigger={
            <Button
              size="massive"
              className="ui button"
              color="orange"
              icon="redo"
              labelPosition="right"
              label="Save changes"
              floated="right"
              onClick={this.handleOpen}
            />
          }
        >
          <Header>Are you sure you want to edit this book?</Header>
          <Modal.Content>
            <Modal.Actions onSubmit={this.handleClose}>
              <Button color="red" content="No, don't edit this book" onClick={this.handleClose} />
              <Modal
                trigger={
                  <Button
                    type="submit"
                    color="green"
                    content="Yes, edit this book"
                    floated="right"
                    onClick={this.handleSubmit}
                  />
                }
              ></Modal>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      </Modal>
    );
  }
}

export default BookEdition;
