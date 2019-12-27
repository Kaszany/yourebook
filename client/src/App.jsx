import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Home from './Views/Home';
import Login from './Views/Login';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (localStorage.getItem('status', true) ? <Component {...props} /> : <Redirect to="/login" />)}
  />
);

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (localStorage.getItem('status', true) ? <Redirect to="/" /> : <Component {...props} />)}
  />
);

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Switch>
          <LoginRoute path="/login" component={Login} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
