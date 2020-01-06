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
		// this.props.modalDeleteBookCardClose();
	}

	showInformation = () => {
		setTimeout(() => {
			this.setState({ modalOpen: false })
		}, 1000);
	}

	deleteBook = async e => {
		e.preventDefault();
		const id = this.props.book._id;

		axios
			.delete(`/api/books/${id}`)
			.then(response => {
				console.log(this.props.book)
				this.deleteBookFromList()
			})
			.catch(error => {
				alert({errorMessage:error.response.data});
				console.log(`login error ${error.response}`);
			});
	}

	render() {
		return (

			<Modal
				size={'small'}
				trigger={
				<Button 
				  type="submit" 
				  color="red"
				  content="Delete book" 
				  floated="right"
				  onClick={this.deleteBook}
				//   onClick={this.modalOpen}
				/>
			}
			>
				<Card fluid color='red'>
					<Card.Content 
					header='This book has removed' 
					textAlign='center'
					onClick={this.showInformation}
					/>
				</Card>
			</Modal>

		)
	}
}

export default DeleteBook;