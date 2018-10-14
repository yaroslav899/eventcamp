import React, { PureComponent } from 'react';
import AuthForm from '../authentication/AuthForm';
import RegisterForm from './RegisterForm';
import { request } from '../../api';
import { globalRecources, fieldsRegisterForm } from '../../recources';

class RegistrationPage extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      firstname: '',
      secondname: '',
      email: '',
      login: '',
      password: '',
      isSuccessRegister: false,
      captcha: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    return;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { captcha } = this.state;
    if (!captcha) {
      return;
    }
    request.createNewUser(this.state).then((data) => {
      this.setState({ isSuccessRegister: true });
      return;
    });
    return;
  }

  onChanges = (value) => {
    this.setState({ captcha: value });
    return;
  }

  render() {
    const { isSuccessRegister } = this.state;
    const simpleFields = Object.keys(fieldsRegisterForm).map((field, index) => (
      <label htmlFor={field} key={index} className="registration-form__label">
        <span>{fieldsRegisterForm[field]}</span>
        <input type="text" name={field} value={this.state[field]} onChange={this.handleChange} />
      </label>
    ));
    const registerForm = (isSuccessRegister ? (
      <div>
        {globalRecources.successRegisterMsg}
        <br/>
        <AuthForm />
      </div>) : (
      <RegisterForm submitHandler={this.handleSubmit}
                    recaptchaHandler={this.onChanges}
                    fields={simpleFields}
                    className="registration__form registration-form" />
      )
    );
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 registration">
            {registerForm}
          </div>
        </div>
      </div>
    );
  }
}

export default RegistrationPage;
