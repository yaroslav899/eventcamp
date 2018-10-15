import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActiveLink from '../hoc/ActiveLink';
import { globalRecources } from '../../recources';
import { getCookie } from '../../cookie';

class AuthHeaderLink extends Component {
  componentDidMount() {
    let authData = getCookie('authData');
    if (authData) {
      authData = JSON.parse(authData);
      store.dispatch({
        type: 'UPDATE_USERAUTH',
        state: {
            name: authData.user_display_name,
            email: authData.user_email,
            token: authData.token,
        }
      });
    }
  }

  render() {
    const {
      userAuth: {
        name,
      },
    } = this.props;
    if (name) return <div className="header__registration">{globalRecources.welcome} <ActiveLink to={`/profile`} className="header-registration__login">{name}</ActiveLink></div>
    return (
      <div className="header__registration header-registration">
        <ActiveLink to="/enter" className="header-registration__enter">{globalRecources.enter}</ActiveLink>
        <ActiveLink to="/register" className="header-registration__register">{globalRecources.registr}</ActiveLink>
      </div>
    )
  }
}

const mapStateToProps = function (store) {
  return {
    userAuth: store.user.state
  }
};

export default connect(mapStateToProps)(AuthHeaderLink);
