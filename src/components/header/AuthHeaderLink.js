import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActiveLink from '../hoc/ActiveLink';
import { globalRecources } from '../../resources';
import { logout } from '../../helper';

class AuthHeaderLink extends Component {
  componentDidMount() {
    let authData = localStorage.getItem('authData');
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
    userAuth: store.user.state
  }
};

export default connect(mapStateToProps)(AuthHeaderLink);
