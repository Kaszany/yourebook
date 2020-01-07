import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, Modal, Header, Form } from 'semantic-ui-react';


class DeleteBook extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
    };
  }

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });
  deleteBook = () => this.setState({ bookOnList: false });

  removeBookFromList = async () => {
    this.props.removeBook(this.props.book._id);
  };

  deleteThisBook = async e => {
    e.preventDefault();
    const id = this.props.book._id;

    axios
      .delete(`/api/books/${id}`)
      .then(response => {
        if (response.data === null) {
          alert('This book has been deleted  already');
        } else {
          setTimeout(this.removeBookFromList, 1000)
        }
        console.log(response);
      })
      .catch(error => {
        alert({ errorMessage: error.response });
        console.log(`login error ${error.response}`);
      });
  };

  render() {
    return (
      <Modal
        size={'small'}
        trigger={
          <Button
            size="tiny"
            labelPosition="left"
            color="red"
            content="Delete book"
            icon="remove"
            onClick={this.handleOpen}
          />
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header>Are you sure you want to delete this book?</Header>
        <Modal.Content>
          <Form onSubmit={this.deleteThisBook}>
            <Modal.Actions>
              <Button style={{ marginLeft: '0px' }} onClick={this.handleClose}>
                Leave
              </Button>
              <Modal
                size={'small'}
                trigger={
                  <Button
                    type="submit"
                    color="red"
                    content="Delete book"
                    floated="right"
                    onClick={this.deleteBook}
                  />
                }
              >
                <Card fluid color="red">
                  <Card.Content header="This book has been removed" textAlign="center" />
                </Card>
              </Modal>
            </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default DeleteBook;
