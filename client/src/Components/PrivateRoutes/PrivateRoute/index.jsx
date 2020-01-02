import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authentication from '../../../App'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>  (Authentication() === false ? <Redirect to="/login" /> : <Component {...props} />)}
    />
  );
};

export default PrivateRoute;

