import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, Modal, Header, Form, Transition } from 'semantic-ui-react';

class DeleteBook extends Component {
	constructor() {
		super();
		this.state = {
			modalOpen: false,
			bookOnList: true
		}
	}
	
	handleOpen = () => this.setState({ modalOpen: true });
	handleClose = () => this.setState({ modalOpen: false });

	deleteBookFromList = () => {
		this.setState({bookOnList: false})
		console.log(this.props.book)

	}

	deleteBook = async e => {
		e.preventDefault();
		const id = this.props.book._id;

		axios
			.delete(`/api/books/${id}`)
			.then(response => {
				this.deleteBookFromList()
				// setTimeout(() => {
					// window.location.reload()
				// }, 1000);
					
			})
			.catch(error => {
				alert({errorMessage:error.response.data});
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
					<Form onSubmit={this.deleteBook}>
						<Modal.Actions onSubmit={this.handleClose}>
							<Button 
							style={{ marginLeft: '0px' }}
							onClick={this.handleClose}
							>
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
								  onClick={this.handleClose}
								/>
								}
							>
								<Card fluid color='red'>
									<Card.Content 
									header='This book has been removed' 
									textAlign='center'/>
								</Card>
							</Modal>
							
						</ Modal.Actions>
					</Form >
				</Modal.Content>
			</Modal>

		)
	}
}

export default DeleteBook;