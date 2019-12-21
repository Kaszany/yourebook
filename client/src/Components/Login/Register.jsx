import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';


class Register extends Component {
    state = { email: '', password: '' };


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

export default Register;