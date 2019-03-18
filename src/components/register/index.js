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
    duplicatepassword: '',
    isSuccessRegister: false,
    captcha: false,
    className: {
      password: '',
      duplicatepassword: '',
    },
    fieldTypes: {
      text: 'text',
      email: 'email',
      password: 'password',
      duplicatepassword: 'password',
    }

  };

  handleChange = (event) => {
    const eventName = event.target.name;
    const {
      className
    } = this.state;

    if (className[eventName]) {
      this.setState(prevState => ({
        className: {
          ...prevState.className,
          [eventName]: 'ads'
        }
      }))
    }

    this.setState({ [eventName]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { captcha } = this.state;
    if (!captcha) {
      return;
    }

    const isPasswordValid = validatePassword();

    request.createNewUser(this.state).then(() => {
      this.setState({ isSuccessRegister: true });
    });
  }

  validatePassword = () => {
    const {
      password,
      duplicatepassword,
    } = this.state;

    if (password !== duplicatepassword) {
      return false;
    }

    return true;
  }

  onChanges = (value) => {
    this.setState({ captcha: value });
  }

  render() {
    const {
      isSuccessRegister,
      className,
      fieldTypes,
    } = this.state;

    const simpleFields = Object.keys(fieldsRegisterForm).map((field) => {
      let fieldValue = fieldsRegisterForm[field];
      let fieldClassName = className[field] || '';
      let fieldType = fieldTypes[field] || fieldTypes.text;

      return <div className="form-row" key={field}>
        <label
          htmlFor={field}
          key={fieldValue}
          className="registration-form__label col-sm-4"
        >
          {fieldValue}
        </label>
        <input
          type={fieldType}
          className={"form-control col-sm-7 " + (fieldClassName)}
          name={field} value={this.state[field]}
          onChange={this.handleChange}
          minLength="3"
          maxLength="64"
        />
      </div>
    });
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
