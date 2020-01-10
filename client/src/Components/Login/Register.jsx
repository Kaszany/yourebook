import React, { Component } from 'react';
import { Form, Input, Button, Modal} from 'semantic-ui-react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
class RegisterForm extends Component {

  state = { 
    name: '', 
    email: '', 
    password: '', 
    passwordconf: '',
    errorMessage: '' 
  };

  onFormChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onFormSubmit = async e => {
    e.preventDefault();
    const { name, email, password, passwordconf} = this.state;
    if (password!==passwordconf) return this.setState({errorMessage: 'confirm password'});
    
    axios
      .post('/api/users', {
        name: name,
        email: email,
        password: password,
      })
      .then(response => {
        localStorage.setItem('status', response.headers['x-auth-token']);
        
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({errorMessage: error.response.data});
        console.log(`login error ${error.response.data}`);
    });
  };

  render() {
    return (
      <Modal className="entrance-center"
        size={'mini'}
        trigger={
          <Button className="big orange ui button" onClick={this.handleOpen}   style={{width: '140px'}}>
            <i className="edit icon"></i>Sign up
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >

      <Modal.Content>
        <div onSubmit={this.onFormSubmit} >
          {this.state.errorMessage && 
          <h3 style={{color: 'red', textAlign: 'center'}}>    {this.state.errorMessage}</h3>}

        <Form >
          <Form.Field>
            <div className="ui labeled input">
              <label className="ui right pointing label" style={{width: '40px'}}><i className="user icon"></i></label>
              <Input placeholder="Name (min. 5 char.)" name="name" value={this.state.name} onChange={this.onFormChange}></Input>
            </div>
          </Form.Field>
          <Form.Field>
            <div className="ui labeled input">
              <label className="ui right pointing label" style={{width: '40px'}}><i className="at icon"></i></label>
              <Input placeholder="Email" name="email" value={this.state.email} onChange={this.onFormChange}></Input>
            </div>
          </Form.Field>
          <Form.Field>
            <div className="ui labeled input">
              <label className="ui right pointing label" style={{width: '40px'}}><i className="lock icon"></i></label>
              <Input className="ui labelled input" placeholder="Password (min. 5 char.)" name="password" value={this.state.password} onChange={this.onFormChange}   type="password"></Input>
            </div>
          </Form.Field>

          <Form.Field>
            <div className="ui labeled input">
              <label className="ui right pointing label" style={{width: '40px'}}><i className="check icon"></i></label>
              <Input className="ui labelled input" placeholder="Confirm password" name="passwordconf" value={this.state.passwordconf} onChange={this.onFormChange}  type="password"></Input>
            </div>
          </Form.Field>
          
          <div style={{display:'flex', justifyContent:'center'}}>
            <Button className="big orange ui button" type="submit"><i className="edit icon"></i>Sign up</Button>
          </div>

        </Form>
        </div>
        </Modal.Content>
      </Modal> 
    );
  }
}

export default withRouter(RegisterForm);
