import React, { Component } from 'react';
// import axios from 'axios';
import { Form, Input, Button } from 'semantic-ui-react';

class Auth extends Component {
  state = { email: '', password: '' };

  formChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onFormSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;

    // axios
    //   .post('/api/auth', {
    //     email: email,
    //     password: password,
    //   })
    //   .then(response => {
    //     console.log(`response ${response}`);
    //   })
    //   .catch(error => {
    //     console.log(`login error ${error}`);
    //   });

    await fetch(`/api/auth`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({
        email: email,
        password: password,
      }),

	})
	.then(function(response) { 
		const date = response
		console.log(date) })
	.catch(function(response) {console.log(response) })
  };



  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <Form.Field>
          <label>Email</label>
          <Input placeholder="Email" name="email" value={this.state.email} onChange={this.formChange}></Input>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Input placeholder="Password" name="password" value={this.state.password} onChange={this.formChange}></Input>
        </Form.Field>
        <Button type="submit">Login</Button>
      </Form>
    );
  }
}

export default Auth;
