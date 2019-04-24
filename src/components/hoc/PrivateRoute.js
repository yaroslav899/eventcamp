import React from 'react';
import { Redirect } from 'react-router-dom';
import { getCookie } from '../../_cookie';

const PrivateRoute = (props) => {
  // ToDo need to redo this approach
  const { redirectTo, component: Component } = props;
  const userData = getCookie('userData');

  if (!userData) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <Component />
  );
};

export default PrivateRoute;