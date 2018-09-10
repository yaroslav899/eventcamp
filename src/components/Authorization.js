import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthForm from './global/AuthForm';
import { Redirect } from "react-router-dom";

class Authorization extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { name } = this.props.userAuth;
        if (name) {
            return <Redirect to="/profile" />
        };
        return (            
            <div className="container">
                <div className="row">
                    <AuthForm />
                </div>
            </div>
        )
    }
}

const mapStateToProps = function (store) {
    return {
        userAuth: store.authuser.state
    }
};

export default connect(mapStateToProps)(Authorization);