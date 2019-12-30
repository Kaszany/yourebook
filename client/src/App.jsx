import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Login from './Views/Login'
import Home from './Views/Home';
import Regist from './Views/Register'
import PrivateRoute from './Components/PrivateRoutes/PrivateRoute'
import LoginRoute from './Components/PrivateRoutes/LoginRoute'



const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Switch>
          <LoginRoute path="/login" component={Login} />
          <PrivateRoute path="/" component={Home} />
          <LoginRoute path="/regist" component={Regist} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
