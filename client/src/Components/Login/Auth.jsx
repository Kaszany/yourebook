import React, { Component } from 'react';
import axios from 'axios';
import { Button, Divider, Form, Grid, Segment, Header, Icon} from 'semantic-ui-react'
import { withRouter } from "react-router-dom";


class Auth extends Component {
  // userData;
  // nextState;

  state = { email: '', password: '' , errorMessage: ''};

  // pobranie i ustawienie wartości input oraz z localStorage
  onFormChange = e => {
    const { name, value } = e.target;
    this.setState( () => { 
      // localStorage.setItem('user', JSON.stringify(this.nextState));
      return {[name]: value };
    });

  };

  // ustawienie wartości localStorage
  componentDidMount() {
    this.userEmail = localStorage.getItem('email');
    this.userPassword = localStorage.getItem('password');

    console.log('dane z localStorage: ',this.userEmail)
    
    // jeżeli dane są zapisane w localStorage to uzuepłnij nimi formularz
    if(localStorage.getItem(this.userEmail)) {
    console.log('dane z localStorage: ',this.userPassword)
      
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

  // componentDidUpdate(nextProps, nextState) {
    // localStorage.setItem('user', JSON.stringify(nextState));
  // }

  //pobranie danych z servera
  onFormSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    localStorage.setItem('email', email);

    axios
      .post('/api/auth', {
        email: email,
        password: password,
      })
      .then(response => {
        console.log('response: ', response);
        
        localStorage.setItem('password', response.data);
    
        this.props.history.push('/');

      })
      .catch(error => {
        this.setState({errorMessage: error.response.data});
        console.log(`login error ${error.response.data}`);
      });
  }

  render() {
    return (
      <div>
        <Header as='h2' icon textAlign='center' style={{marginTop: '100px', marginBottom: '100px'}}>
          <Header.Content>Welcome at BookStorm</Header.Content>
          <Grid>
            <Grid.Column width={5}>
              <Icon name='lightning'style={{marginTop: '50px'}} />
            </Grid.Column>
            <Grid.Column width={5}>
              <Icon name='lightning'style={{marginTop: '50px'}}/>
            </Grid.Column>
            <Grid.Column width={5}>
              <Icon name='lightning'style={{marginTop: '50px'}}/>
            </Grid.Column>
          </Grid>
        </Header>

        <Segment placeholder onSubmit={this.onFormSubmit}>
          {this.state.errorMessage && 
          <h3 style={{color: 'red', textAlign: 'center'}}>{this.state.errorMessage}</h3>}
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              <Form>
                <Form.Input
                  icon='user'
                  iconPosition='left'
                  label='Email'
                  name="email" 
                  value={this.state.email} 
                  onChange={this.onFormChange}
                />
                <Form.Input
                  icon='lock'
                  iconPosition='left'
                  label='Password'
                  type='password'
                  name="password" 
                  value={this.state.password} 
                  onChange={this.onFormChange}
                />
                <Grid>
                  <Grid.Column width={8} style={{marginTop: '10px', right: '0'}}>
                    <Button content='Login' primary />
                  </Grid.Column>
                  <Grid.Column width={8} style={{marginTop: '10px'}}>
                    <Button content='I forgot my  password' />
                  </Grid.Column>
                </Grid>
              </Form>
            </Grid.Column>

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
