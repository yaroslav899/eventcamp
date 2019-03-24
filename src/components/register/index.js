import React, { PureComponent } from 'react';
import AuthForm from './AuthForm';
import RegisterForm from './RegisterForm';
import { formValidator } from '../../validator';
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
    isRegisterFormValid: true,
    captcha: false,
    privacyChecked: false,
    className: {
      password: '',
      duplicatepassword: '',
    },
    fieldTypes: {
      text: 'text',
      email: 'email',
      password: 'password',
      duplicatepassword: 'password',
    },
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
          [eventName]: 'ads',
        }
      }))
    }

    this.setState({ [eventName]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const isFormValid = this.validator();


    /*request.createNewUser(this.state).then(() => {
        this.setState({ isSuccessRegister: true });
      });*/
  }

  privacyHandler = (event) => {
      this.setState({privacyChecked: !this.state.privacyChecked});
  }

  validator = () => {
      const fields = {
        email: {
          value: this.state.email,
        },
        login: {
          value: this.state.login,
        },
        password: {
          value: this.state.password,
        },
        duplicatepassword: {
          value: this.state.duplicatepassword,
          duplicate: this.state.password,
        },
        captcha: {
          value: this.state.captcha,
        },
        privacyPolicy: {
          value: this.state.privacyChecked,
        },
       };

       const s = formValidator(fields);
       const r = 0;
      /*const {
        captcha,
        privacyChecked,
      } = this.state;

      if (!captcha || !privacyChecked) {
          this.validator();
          return false;
        }
      const isPasswordValid = this.validatePassword();*/
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
        privacyHandler={this.privacyHandler}
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
