import React, { Component, Fragment } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { reCaptcha } from '../../credentials';
import { formValidator } from '../../validator';
import { request } from '../../api';
import { titleList, globalRecources, fieldsRegisterForm } from '../../resources';

class RegisterForm extends Component {
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

  render() {
    const {
      props: {
        privacyHandler,
        recaptchaHandler,
        fields,
        className,
      } = {},
    } = this;
    return (
      <Fragment>
        <h3>{titleList.registration}</h3>
        <form onSubmit={this.submitHandler} className={className}>
          {fields}
          <br />

          <input type="checkbox" onChange={privacyHandler} />
          {globalRecources.privacy}

          <ReCAPTCHA
            sitekey={reCaptcha.siteKey}
            onChange={recaptchaHandler}
          />

          <input type="submit" value="Submit" className="btn btn-secondary" />
        </form>
      </Fragment>
    )
  }
}

export default RegisterForm;

/*const RegisterForm = ({
  submitHandler,
  privacyHandler,
  recaptchaHandler,
  fields,
  className,
}) => (
  <Fragment>
    <h3>{titleList.registration}</h3>
    <form onSubmit={submitHandler} className={className}>
      {fields}
      <br />

      <input type="checkbox" onChange={privacyHandler} />
      {globalRecources.privacy}

      <ReCAPTCHA
        sitekey={reCaptcha.siteKey}
        onChange={recaptchaHandler}
      />

      <input type="submit" value="Submit" className="btn btn-secondary" />
    </form>
    <span>{!formValidationMessage}</span>
  </Fragment>
);
export default RegisterForm;*/
