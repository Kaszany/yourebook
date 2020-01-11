import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Login from './Views/Login';
import Home from './Views/Home';
import './App.css'
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
            </AuthLoader>
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
