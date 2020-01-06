import React, { Component } from 'react';
import { Button, Card, Modal, Header, Form} from 'semantic-ui-react';
import DeleteBook from '../DeleteBook';

class DeleteBookCard extends Component {
	constructor() {
		super();
		this.state = {
			modalOpen: false,
		}
	}

	handleOpen = () => this.setState({ modalOpen: true });
	handleClose = () => this.setState({ modalOpen: false });

	render() {
		return (
			<Modal
				size={'small'}
				trigger={
				<Button 
					type='submit'
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
					<Form onSubmit={this.handleClose}>
						<Modal.Actions>
							<Button 
							style={{ marginLeft: '0px' }}
							onClick={this.handleClose}
							>
								Leave
              				</Button>
							<DeleteBook 
							book={this.props.book} handleClose={this.handleClose} />
						</ Modal.Actions>
					</Form >
				</Modal.Content>
			</Modal>
			
	)}
}

export default DeleteBookCard;