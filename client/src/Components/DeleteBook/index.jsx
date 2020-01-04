import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, Header, Form } from 'semantic-ui-react';

class DeleteBook extends Component {
	constructor() {
		super();
		this.state = {
			modalOpen: false,
		}
	}

	handleOpen = () => this.setState({ modalOpen: true });
	handleClose = () => this.setState({ modalOpen: false });
	
	deleteThisBook = async e => {
		e.preventDefault();
		const id = this.props.book._id;

		axios
			.delete(`/api/books/${id}`)
			.then(response => {
			  console.log('response: ', response);
			  alert('This book has been removed');
			  this.setState({ modalOpen: false });
			})
			.catch(error => {
			  this.setState({errorMessage: 	error.response.data});
			  console.log(`login error ${error.response.data}`);
			});
	}

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
					{/* <Card.Header>{title}</Card.Header> */}
						<Modal.Actions>
							  <Button 
							  style={{ marginLeft: '0px' }} onClick={this.handleClose}>
              				  Leave
              				</Button>
							<Button 
							  type="submit" 
							  color="red"
							  content="Delete book" 
							  floated="right" 
							  />
            			</Modal.Actions>
					</Form>
				</Modal.Content>
			</Modal>

		)
	}
}

export default DeleteBook;