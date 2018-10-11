import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      redirectTo,
      component: Component,
      userAuth: {
        name,
      },
    } = this.props;
    if (!name) {
      return <Redirect to={redirectTo} />;
    }
    return (
      <Component />
    )
  }
}

const mapStateToProps = function (store) {
  return {
    userAuth: store.user.state,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
