import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import ActiveLink from '../hoc/ActiveLink';
import { globalRecources } from '../../resources';
import { logout } from '../../helper';

class AuthHeaderLink extends Component {
  logoutUser = (event) => logout();

  render() {
    const {
      userAuth: {
        name,
      },
    } = this.props;

    if (name) {
      return (
        <div className="header__registration" >
          {globalRecources.welcome} <ActiveLink to={`/profile`} className="header-registration__login" >{name}</ActiveLink >
          <button className="header-registration__exit" onClick={this.logoutUser}>
            выход
          </button>
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
