import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {Authentication} from '../../../App';

const LoginRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (Authentication()  ?  <Redirect to="/"  /> : <Component {...props} />)} />
  );
};

export default LoginRoute;
