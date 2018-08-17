import React, { PureComponent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { request } from '../api';

class Registration extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            firstname: '',
            secondname: '',
            email: '',
            login: '',
            password: '',
            isSuccessRegister: false,
            captcha : false,
        };
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        if (!this.state.captcha) {
            return false;
        }
        var isSuccessRegister = request.createNewUser(this.state).then(function (data) {
            return true;
        });
        this.setState({ 'isSuccessRegister': isSuccessRegister });
    }

    onChanges = (value) => {
        this.setState({ captcha: value })
    }

    render() {
        let { isSuccessRegister } = this.state;    
        let registerForm = isSuccessRegister ? <div> Вы успешно зарегистрировались<br />
            Попробуйте зайдти в свой аккаунт</div > : <div><form onSubmit={this.handleSubmit}>
                <label><span>Имя:</span>
                    <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} />
                </label><br />
                <label><span>Фамилия:</span>
                    <input type="text" name="secondname" value={this.state.secondname} onChange={this.handleChange} />
                </label><br />
                <label><span>Email:</span>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                </label><br />
                <label><span>Login:</span>
                    <input type="text" name="login" value={this.state.login} onChange={this.handleChange} />
                </label><br />
                <label><span>Password:</span>
                    <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                </label><br />
                <ReCAPTCHA
                    ref="recaptcha"
                    sitekey="6LeY82kUAAAAANR8Eflisz-Ptp1FtnHYTx5MJ6VJ"
                    onChange={this.onChanges}
                /><br/>
                <input type="submit" value="Submit" />
            </form></div>;
        return (
                <div className="container">
                    <div className="row">
                            {registerForm}              
                    </div>
                </div>
            )        
    }
}

const mapStateToProps = function (store) {
    return {
        posts: store.filterState.list
    }
};

export default connect(mapStateToProps)(Registration);