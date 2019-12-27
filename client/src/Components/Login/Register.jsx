import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import axios from 'axios';

class Register extends Component {
    state = { name: '', email: '', password: '', passwordconf: '' };

    onFormChange = e => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    };
  
    onFormSubmit = async e => {
      e.preventDefault();
      const { name, email, password, passwordconf} = this.state;
      if (password!==passwordconf) return (console.log('confirm password'));

      axios
        .post('/api/users', {
          name: name,
          email: email,
          password: password,
          // passwordconf: passwordconf,
        })
        .then(response => {
          // if (resoponse.data.logged) {
            // // this.props.handleSuccessfulAuth(response.data);
          // }
          console.log(response);
        })
        .catch(error => {
          console.log(`login error ${error}`);
        });
  };

    render() {
      return (
          <Form onSubmit={this.onFormSubmit}>
            <Form.Field>
              <label>Name</label>
              <Input placeholder="Name" name="name" value={this.state.name} onChange={this.onFormChange}></Input>
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Input placeholder="Email" name="email" value={this.state.email} onChange={this.onFormChange}></Input>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input placeholder="Password" name="password" value={this.state.password} onChange={this.onFormChange}></Input>
            </Form.Field>
            <Form.Field>
              <label>Confirm password</label>
              <Input placeholder="Confirm password" name="passwordconf" value={this.state.passwordconf} onChange={this.onFormChange}></Input>
            </Form.Field>
            <div style={{display:'flex', justifyContent:'center'}}>
              <Button type="submit" style={{width: '250px'}}>Sign in</Button>
            </div>
            
          </Form>
        );
      }

}

export default Register;