import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Home from './Views/Home';
import Login from './Views/Login';
import Books from './Views/Books';

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/books" component={Books} />
          <Route path="/" component={Home} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
