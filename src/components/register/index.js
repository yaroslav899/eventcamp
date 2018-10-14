import React, { PureComponent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import AuthForm from '../authentication/AuthForm';
import { request } from '../../api';
import { fieldsRegisterForm } from '../../recources';

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
    const simpleFields = Object.keys(fieldsRegisterForm).map((field) => (
      <label htmlFor={field}>
        <span>{fieldsRegisterForm[field]}</span>
        <input type="text" name={field} value={this.state[field]} onChange={this.handleChange} />
      </label>
    ),
    );
    const registerForm = (isSuccessRegister ? (
      <div>
        Вы успешно зарегистрировались
        <br />
        Попробуйте зайдти в свой аккаунт
        <br />
        <AuthForm />
      </div>) : (
        <div>
          <form onSubmit={this.handleSubmit}>
            {simpleFields}
            <br />
            <ReCAPTCHA
              ref="recaptcha"
              sitekey="6LeY82kUAAAAANR8Eflisz-Ptp1FtnHYTx5MJ6VJ"
              onChange={this.onChanges}
            />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>)
    );
    return (
      <div className="container">
        <div className="row">
          {registerForm}
        </div>
      </div>
    );
  }
}

export default RegistrationPage;
