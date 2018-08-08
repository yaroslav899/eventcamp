import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { request } from '../api';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            firstname: '',
            secondname: '',
            email: '',
            login: '',
            password: '',
            name: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        request.createNewUser(this.state);
    }

    render() {
        //if return <Redirect to='/login' />;
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Имя:
                    <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Фамилия:
                    <input type="text" name="secondname" value={this.state.secondname} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Login:
                    <input type="text" name="login" value={this.state.login} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

const mapStateToProps = function (store) {
    return {
        posts: store.filterState.list
    }
};

export default connect(mapStateToProps)(Registration);