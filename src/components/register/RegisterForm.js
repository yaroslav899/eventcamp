import React, { Component, Fragment } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { reCaptcha } from '../../credentials';
import { formValidator } from '../../validator';
import { request } from '../../api';
import { fieldsRegisterForm, detailRecources } from '../../resources';
import { titleList, globalRecources } from '../../resources/global';

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.fieldTypes = {
      text: 'text',
      email: 'email',
      password: 'password',
      duplicatepassword: 'password',
    };

    this.state = {
      firstname: '',
      secondname: '',
      email: '',
      login: '',
      password: '',
      duplicatepassword: '',
      isSuccessRegister: false,
      captcha: false,
      privacyChecked: false,
      errorMsg: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      errorMsg: '',
    });
  }

  reCaptchaHandler = (value) => {
    this.setState({ captcha: value });
  }

  privacyHandler = () => {
    const { privacyChecked } = this.state;
    this.setState({ privacyChecked: !privacyChecked });
  }

  submitHandler = (event) => {
    event.preventDefault();

    const checkValidForm = this.validator();

    if (!checkValidForm.success) {
      this.setState({ errorMsg: checkValidForm.errorMsg });
      return false;
    }

    return request.createNewUser(this.state).then((response) => {
      const { message = null } = response;

      if (message) {
        this.setState({ errorMsg: response.message });
      } else {
        this.setState({ isSuccessRegister: true });
      }
    });
  }

  validator = () => {
    const {
      state: {
        email,
        login,
        password,
        duplicatepassword,
        captcha,
        privacyChecked,
      } = {},
    } = this;

    const fields = {
      captcha: {
        value: captcha,
      },
      privacyChecked: {
        value: privacyChecked,
      },
      email: {
        value: email,
      },
      login: {
        value: login,
      },
      password: {
        value: password,
      },
      duplicatepassword: {
        value: duplicatepassword,
        duplicate: password,
      },
    };

    return formValidator(fields);
  }

  render() {
    const { isSuccessRegister } = this.state;

    if (isSuccessRegister) {
      return (
        <Fragment>
          Вы успешно зарегестрировались. Можете выполнить вход.
        </Fragment>
      );
    }

    const { errorMsg } = this.state;
    const fields = Object.keys(fieldsRegisterForm).map((field) => {
      let fieldValue = fieldsRegisterForm[field];
      let fieldType = this.fieldTypes[field] || this.fieldTypes.text;

      return (
        <div className="form-row" key={field}>
          <label htmlFor={field} key={fieldValue} className="registration-form__label col-sm-4">
            {fieldValue}
          </label>
          <input
            type={fieldType}
            id={field}
            className="form-control col-sm-7"
            name={field}
            value={this.state[field]}
            onChange={this.handleChange}
          />
        </div>
      );
    });

    return (
      <Fragment>
        <h3>{titleList.registration}</h3>
        <form onSubmit={this.submitHandler} className="registration__form registration-form">
          {fields}
          <br />
          <input type="checkbox" onChange={this.privacyHandler} />
          {globalRecources.privacy}
          <ReCAPTCHA sitekey={reCaptcha.siteKey} onChange={this.reCaptchaHandler} />
          <span className="error-message">{errorMsg}</span>
          <input type="submit" value={detailRecources.register} className="btn btn-secondary submit" />
        </form>
      </Fragment>
    );
  }
}

export default RegisterForm;
