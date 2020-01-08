import React, { Component } from 'react';
import { Button, Modal, Card, Header } from 'semantic-ui-react';

class DeleteFavoritesButton extends Component {
  state = {
    disabled: false,
    modalOpen: false,
  };

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  removeFromFavorites = async e => {
    Array.prototype.remove = function(v) {
      if (this.indexOf(v) != -1) {
        this.splice(this.indexOf(v), 1);
        return true;
      }
      return false;
    };
    this.props.favorites.remove(this.props.book);
    this.setState({ disabled: true });
    this.props.modalFavoritesClose();
  };

  render() {
    return (
      <Modal
        size={'small'}
        trigger={
          <Button
            size="massive"
            color="red"
            icon="remove circle"
            labelPosition="right"
            label="Remove this book from favorite"
            floated="right"
            onClick={this.handleOpen}
            disabled={this.state.disabled}
          />
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header>Are you sure you want to remove this book from favorite?</Header>
        <Modal.Content>
          <Modal.Actions onSubmit={this.handleClose}>
            <Button color="green" content="Leave this book in favorite" onClick={this.handleClose} />
            <Modal
              trigger={
                <Button
                  type="submit"
                  color="red"
                  content="Remove book from favorite"
                  floated="right"
                  onClick={this.removeFromFavorites}
                />
              }
            ></Modal>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
    );
  }
}

export default DeleteFavoritesButton;
