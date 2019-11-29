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
      userAuth: { name },
      exitButton,
      enterButton,
      registerButton,
    } = this.props;

    if (name) {
      return (
        <div className="header__registration">
          <ActiveLink to={userMenu.profile} className="header-registration__login">
            {name}
          </ActiveLink>
          <button type="button" onClick={this.logoutUser}>
            {exitButton}
          </button>
        </div>
      );
    }

    return (
      <div className="header__registration header-registration">
        <ActiveLink to={userMenu.register}>
          {enterButton}
        </ActiveLink>
        <ActiveLink to={userMenu.register}>
          {registerButton}
        </ActiveLink>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return { userAuth: store.user.data };
}

AuthHeaderLink.defaultProps = {
  exitButton: globalRecources.exit,
  enterButton: globalRecources.enter,
  registerButton: globalRecources.registr,
};

export default connect(mapStateToProps)(AuthHeaderLink);
