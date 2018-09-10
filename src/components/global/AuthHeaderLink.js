import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ActiveLink from '../hoc/ActiveLink';
import { globalRecources, imageUrlRecources } from '../../recources';
import { getCookie } from '../../cookie';

class AuthHeaderLink extends Component {
    constructor(props) {
        super(props);
    }
    
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
        let { name } = this.props.userAuth;
        let authLinks = !name ? <div><ActiveLink to="/enter" >{globalRecources.enter}</ActiveLink>
                                    <ActiveLink to="/register" >{globalRecources.registr}</ActiveLink>
                                </div>
            : <div>Добро пожаловать <NavLink to={`/profile`}>{name}</NavLink></div>

        return (
            <div className="auth">
                {authLinks}
            </div>
        )
    }
}

const mapStateToProps = function (store) {
    return {
        userAuth: store.authuser.state
    }
};

export default connect(mapStateToProps)(AuthHeaderLink);