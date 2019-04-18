import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { getCookie } from '../../_cookie';

export default class PrivateRoute extends PureComponent {
  render() {
    // ToDo change approach
    const {
      props: {
        redirectTo,
        component: Component,
      },
    } = this;
    const userData = getCookie('userData');

    if (!userData) {
      return <Redirect to={redirectTo} />;
    }

    return (
      <Component />
    );
  }
}
