import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const LoginRoute = ({ component: Component, ...rest }) => {
  return <Route
    {...rest}
    render={props => (localStorage.getItem('status') ? <Redirect to="/" /> : <Component {...props} />)}
  />
};

export default LoginRoute;
