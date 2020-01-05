import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {Loader, Segment, Container} from 'semantic-ui-react'
import getToken from '../../utils/getToken'
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
          <Loader size="massive">Please wait...</Loader>
      );
    }
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(AuthLoader);
