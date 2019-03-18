import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getCookie } from '../../_cookie';

export default class PrivateRoute extends Component {
  render() {
    //ToDo change approach
    const {
      redirectTo,
      component: Component,
    } = this.props;
    const userData = JSON.parse(getCookie('userData'));

    if (!userData) {
      return <Redirect to={redirectTo} />;
    }

    return (
      <Component />
    )
  }
}
