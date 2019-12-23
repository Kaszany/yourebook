import React, { Component } from 'react';
import axios from 'axios';
import { Button, Divider, Form, Grid, Segment, Header, Icon} from 'semantic-ui-react'


class Auth extends Component {
  userData;

  state = { email: '', password: '' , errorMessage: ''};

  // pobranie i ustawienie wartości input
  onFormChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // ustawienie wartości localStorage
  componentDidMount() {
    this.userData = JSON.parse(localStorage.getItem('user'));
    console.log(this.userData)

    // jeżeli dane są zapisane w localStorage to uzuepłnij nimi formularz
    if(localStorage.getItem('user')) {
      this.setState({
        email: this.userData.email,
        password: this.userData.password
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

  //pobranie danych z servera
  onFormSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;

    axios
      .post('/api/auth', {
        email: email,
        password: password,
      })
      .then(response => {
        console.log(response);
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
                <Button content='Login' primary />
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

export default Auth;
