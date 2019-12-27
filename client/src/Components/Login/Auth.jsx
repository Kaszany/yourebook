import React, { Component } from 'react';
import axios from 'axios';
import { Button, Divider, Form, Grid, Segment, Header, Ico, Modal} from 'semantic-ui-react'
import { withRouter } from "react-router-dom";


class Auth extends Component {
  userData;

  state = { 
    email: '', 
    password: '', 
    errorMessage: ''
  };

  // pobranie i ustawienie wartości input
  onFormChange = e => {
    const { name, value } = e.target;
    this.setState( () => { 
      // localStorage.setItem('user', JSON.stringify(this.nextState));
      return {[name]: value };
    });

  };

  // pobieranie wartości z localStorage. Jezeli w localStorage jest zapisany status(token) to przenosimy do Home
  componentDidMount() {
    if(localStorage.getItem('status')) {
      this.props.history.push('/')
    } else {
    this.userEmail = localStorage.getItem('email');
    // this.userPassword = localStorage.getItem('password');

    // jeżeli dane (email) są zapisane w localStorage to uzuepłnij nimi formularz
    if(localStorage.getItem('email')) {
      this.setState({
        email: this.userEmail,
        password: this.userPassword
      })
    }
    // jeżeli w localStorage nie ma danych to pozostawiamy te pola puste
    else {
      this.setState({
        email:'',
        password:''
      })
    }
  }

  componentDidUpdate(nextProps, nextState) {
    localStorage.setItem('user', JSON.stringify(nextState));
  }

  //  pobranie danych z formularza
  onFormSubmit = async e => {
    e.preventDefault();
    const { email, password} = this.state;

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

    // zapisanie email do localStorage
    localStorage.setItem('email', email);

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

  // przekierowanie do rejestracji - adres przekierowania do poprawy!!!
  // onRegister = e => {
  //   e.preventDefault();
  //   this.props.history.push('/regist');
  // }


  //tabelka
  render() {
    return (
      <div>
    
          {this.state.errorMessage && 
          <h3 style={{color: 'red', textAlign: 'center'}}>{this.state.errorMessage}</h3>}
          <Form>
            <Form.Field>
              <div className="ui labeled input">
                <label className="ui right pointing label" style={{width: '40px'}}><i className="at icon"></i></label>
                <Form.Input className="ui labelled input" placeholder="Email" name="email" value={this.state.email} onChange={this.onFormChange}></Form.Input>
              </div>
            </Form.Field>
            <Form.Field>
              <div className="ui labeled input">
                <label className="ui right pointing label" style={{width: '40px'}}><i className="lock icon"></i></label>
                <Form.Input className="ui labelled input" placeholder="Password" name="password" type='password' value={this.state.password} onChange={this.onFormChange}></Form.Input>
              </div>
            </Form.Field>
                <div>
                <Button className="olive ui button"><i className="check icon"></i>Login</Button>
                  {/* <Button content='I forgot my password' /> */}
                </div>
          </Form>

            <Grid.Column verticalAlign='middle'>
              <Button content='Sign up' icon='signup'   size='big' />
            </Grid.Column>
          </Grid>
          <Divider vertical>Or</Divider>
        </Segment>
      </div>
    );
  }
}

// export default Auth;
export default withRouter(Auth)
