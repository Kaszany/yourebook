import React, { Component } from 'react';
import axios from 'axios';
import { Button, Divider, Form, Grid, Segment, Header, Icon} from 'semantic-ui-react'


class Auth extends Component {
  state = { email: '', password: '' };

  onFormChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onFormSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;

    axios
      .post('/api/auth', {
        email: email,
        password: password,
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

    // await fetch(`/api/auth`, {
    //   method: 'post',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
	//   },
	//   body: JSON.stringify({
    //     email: email,
    //     password: password,
    //   }),

	// })
	// .then(function(response) { 
	// 	const date = response
	// 	console.log(date) })
	// .catch(function(response) {console.log(response) })
  };

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
