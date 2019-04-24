import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActiveLink from '../hoc/ActiveLink';
import { globalRecources } from '../../resources/global';
import { userMenu } from '../../resources/menu';
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
          <ActiveLink to={userMenu.profile} className="header-registration__login" >
            {name}
          </ActiveLink >
          <a className="header-registration__exit" onClick={this.logoutUser}>
            {globalRecources.exit}
          </a>
        </div>
        )
    }

    return (
      <div className="header__registration header-registration">
        <ActiveLink to={userMenu.register}>
          {globalRecources.enter}
        </ActiveLink>
        <ActiveLink to={userMenu.register}>
          {globalRecources.registr}
        </ActiveLink>
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
