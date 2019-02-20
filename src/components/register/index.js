import React, { PureComponent } from 'react';
import AuthForm from './AuthForm';
import RegisterForm from './RegisterForm';
import Adventages from '../global/Adventages';
import { request } from '../../api';
import { globalRecources, fieldsRegisterForm } from '../../resources';

class RegistrationPage extends PureComponent {
  state = {
    firstname: '',
    secondname: '',
    email: '',
    login: '',
    password: '',
    isSuccessRegister: false,
    captcha: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { captcha } = this.state;
    if (!captcha) {
      return;
    }
    request.createNewUser(this.state).then(() => {
      this.setState({ isSuccessRegister: true });
    });
  }

  onChanges = (value) => {
    this.setState({ captcha: value });
  }

  render() {
    const { isSuccessRegister } = this.state;
    const simpleFields = Object.keys(fieldsRegisterForm).map((field) => (
      <div className="form-row" key={field}>
        <label htmlFor={field} key={fieldsRegisterForm[field]} className="registration-form__label col-sm-2">{fieldsRegisterForm[field]}</label>
        <input type="text" className="form-control col-sm-8" name={field} value={this.state[field]} onChange={this.handleChange} />
      </div>
    ));
    const registerForm = (isSuccessRegister ? (
      <div>
        {globalRecources.successRegisterMsg}
        <br />
        <AuthForm />
      </div>) : (
      <RegisterForm
        submitHandler={this.handleSubmit}
        recaptchaHandler={this.onChanges}
        fields={simpleFields}
        className="registration__form registration-form"
      />
      )
    );
    return (
      <div className="container">
        <Adventages />
        <div className="row">
          <div className="col-6">
            <AuthForm />
          </div>
          <div className="col-6 registration">
            {registerForm}
          </div>
        </div>
      </div>
    );
  }
}

export default RegistrationPage;
