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
  if (!token) {
    return false;
  }

  axios
    .get('api/users/me', { headers: { 'x-auth-token': token } })
    .then(res => console.log(res.data))
    .catch(err => {
      localStorage.removeItem('status')
      console.log(err);
      return false;
    });
    return true;
};

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Switch>
          <LoginRoute path="/login" component={Login} />
          <PrivateRoute path="/" component={Home} />
          {/* <LoginRoute path="/regist" component={Regist} /> */}
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
