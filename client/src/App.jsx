import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Home from './Views/Home';


const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
