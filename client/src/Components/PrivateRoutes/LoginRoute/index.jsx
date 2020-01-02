import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {Authentication} from '../../../App';

const LoginRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (Authentication() === false ? <Component {...props} /> : <Redirect to="/" />)} />
  );
};

export default LoginRoute;
