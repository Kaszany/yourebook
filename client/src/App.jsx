import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Home from './Views/Home';
import Login from './Views/Login';
import Register from './Views/Register';

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/regist" component={Register} />
          <Route path="/" component={Home} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
