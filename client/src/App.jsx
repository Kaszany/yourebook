import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Login from './Views/Login';
import Home from './Views/Home';
import Regist from './Views/Register';
import PrivateRoute from './Components/PrivateRoutes/PrivateRoute';
import LoginRoute from './Components/PrivateRoutes/LoginRoute';
import axios from 'axios';

const getToken = () => {
  return localStorage.getItem('status');
};

export const Authentication = () => {
  const token = getToken();
  console.log(token);
  if (!token) {
    return false;
  }

  axios
    .get('/me', { headers: { Auth: `Bearer ${token}` } })
    .then(res => console.log(res.data))
    .catch(err => {
      console.log('DENIED')
      return false;
    });
};

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={Home} />
          {/* <LoginRoute path="/regist" component={Regist} /> */}
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
