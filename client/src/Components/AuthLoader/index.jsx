import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Loader, Dimmer } from 'semantic-ui-react';

import getToken from '../../utils/getToken';
import { UserContextProvider } from './UserContext';
class AuthLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  componentDidMount() {
    const token = getToken();
    if (!token) {
      console.log('brak tokena');
      this.props.history.push('/login');
    }

    axios
      .get('api/users/me', { headers: { 'x-auth-token': token } })
      .then(res => this.setState({ user: res.data }))
      .catch(err => {
        localStorage.removeItem('status');
        console.log(err);
        this.props.history.push('/login');
      });
  }

  render() {
    if (this.state.user === null) {
      return (
        <Dimmer active>
          <Loader size="massive">Please wait...</Loader>
        </Dimmer>
      );
    }
    return <UserContextProvider value={this.state.user}>{this.props.children}</UserContextProvider>;
  }
}

export default withRouter(AuthLoader);
