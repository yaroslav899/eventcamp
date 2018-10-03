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
      component,
      userAuth: {
        name,
      },
    } = this.props;
    if (!name) {
      return <Redirect to={redirectTo} />;
    }
    return (
      <component />
    )
  }
}

const mapStateToProps = function (store) {
  return {
    userAuth: store.authuser.state,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
