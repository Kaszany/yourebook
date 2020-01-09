import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Modal} from 'semantic-ui-react'
import { withRouter } from "react-router-dom";

import '../../App.css';


class LoginForm extends Component {

  state = { 
    email: '', 
    password: '', 
    errorMessage: ''
  };

  // pobranie i ustawienie wartości input
  onFormChange = e => {
    const { name, value } = e.target;
    this.setState( () => { 
      return {[name]: value };
    });
  };

  //  pobranie danych z formularza
  onFormSubmit = async e => {
    e.preventDefault();
    const { email, password} = this.state;

    // zapisanie email do localStorage
    // localStorage.setItem('email', email);

    axios
      .post('/api/auth', {
        email: email,
        password: password,
      })
      .then(response => {
        console.log('response: ', response);

        // zapisywanie statusu, jako token do localStorage
        localStorage.setItem('status', response.data);

        //przekierowanie do home po poprawnym zalogowaniu
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({errorMessage: error.response.data});
        console.log(`login error ${error.response.data}`);
      });
  }

  render() {
    return (

      <Modal className="entrance-center"
        size={'mini'}
        trigger={
          <Button className="big olive ui button" onClick={this.handleOpen} style={{width: '140px'}}>
            <i className="check icon"></i>Login
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >

        <Modal.Content> 
          <div onSubmit={this.onFormSubmit}>
            {this.state.errorMessage && 
            <h3 style={{color: 'red', textAlign: 'center'}}>  {this.state.errorMessage}</h3>}

            <Form>
              <Form.Field>
                <div className="ui labeled input">
                  <label className="ui right pointing label" style={{width: '40px'}}><i className="at icon"></i></  label>
                  <Form.Input className="ui labelled input"   placeholder="Email" name="email" value= {this.state.email} onChange={this.onFormChange}></ Form.Input>
                </div>
              </Form.Field>
              <Form.Field>
                <div className="ui labeled input">
                  <label className="ui right pointing label" style={  {width: '40px'}}><i className="lock icon"></i></  label>
                  <Form.Input className="ui labelled input"   placeholder="Password" name="password"  type='password' value={this.state.password}  onChange={this.onFormChange}></Form.Input>
                </div>
              </Form.Field>
                  <div style={{display:'flex', justifyContent:'center'}}>
                    <Button className="big olive ui button"><i  className="check icon"></i>Login</Button>
                  </div>
            </Form>
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}

export default withRouter(LoginForm)
