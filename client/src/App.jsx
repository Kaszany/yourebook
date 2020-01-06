import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Login from './Views/Login';
import Home from './Views/Home';
import Regist from './Views/Register';
import PrivateRoute from './Components/PrivateRoutes/PrivateRoute';
import LoginRoute from './Components/PrivateRoutes/LoginRoute';
import axios from 'axios';
import AuthLoader from './Components/AuthLoader';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <AuthLoader>
              <Route path="/" component={Home} />
              {/* <LoginRoute path="/regist" component={Regist} /> */}
            </AuthLoader>
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
