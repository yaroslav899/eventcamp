import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActiveLink from '../hoc/ActiveLink';
import { globalRecources } from '../../resources';
import { logout } from '../../helper';

class AuthHeaderLink extends Component {
  logoutUser = () => logout();

  render() {
    const {
      userAuth: {
        name,
      },
    } = this.props;

    if (name) {
      return (
        <div className="header__registration">
          <ActiveLink to={`/profile`} className="header-registration__login" >{name}</ActiveLink >
          <a className="header-registration__exit" onClick={this.logoutUser}>
            {globalRecources.exit}
          </a>
        </div>
        )
    }

    return (
      <div className="header__registration header-registration">
        <ActiveLink to="/register">{globalRecources.enter}</ActiveLink>
        <ActiveLink to="/register">{globalRecources.registr}</ActiveLink>
      </div>
    )
  }
}

const mapStateToProps = function (store) {
  return {
    userAuth: store.user.data
  }
};

export default connect(mapStateToProps)(AuthHeaderLink);
