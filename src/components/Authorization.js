import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AuthForm from './global/AuthForm';

class Authorization extends PureComponent {
  render() {
    const { name } = this.props.userAuth;
    if (name) {
      return <Redirect to="/profile" />;
    }
    return (
      <div className="container">
        <div className="row">
          <AuthForm />
        </div>
      </div>
    );
  }
}

const mapStateToProps = function (store) {
  return {
    userAuth: store.user.state,
  };
};

export default connect(mapStateToProps)(Authorization);
