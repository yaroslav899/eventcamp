import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-multi-lang';
import ActiveLink from '../hoc/ActiveLink';
import { userMenu } from '../../resources/menu';
import { logout } from '../../helper';

class AuthHeaderLink extends PureComponent {
  logoutUser = () => logout();

  render() {
    const {
      userAuth: { name },
      t,
    } = this.props;

    if (name) {
      return (
        <div className="header__registration">
          <ActiveLink to={userMenu.profile} className="header-registration__login">
            {name}
          </ActiveLink>
          <button type="button" onClick={this.logoutUser}>
            {t('global.button.exit')}
          </button>
        </div>
      );
    }

    return (
      <div className="header__registration header-registration">
        <ActiveLink to={userMenu.register}>
          {t('global.enter')}
        </ActiveLink>
        <ActiveLink to={userMenu.register}>
          {t('global.button.registr')}
        </ActiveLink>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return { userAuth: store.user.data };
}

export default withTranslation(connect(mapStateToProps)(AuthHeaderLink));
