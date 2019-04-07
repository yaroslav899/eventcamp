import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { request } from '../../api';
import { fieldsRegisterForm } from '../../resources';

class AuthForm extends PureComponent {
  state = {
    login: '',
    password: '',
    isSuccessAuth: false,
    isValidForm: true,
  };

  handleChange = (event) => {
    this.setState({ isValidForm: true });
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    request.authUser(this.state)
      .then((response) => {
        this.setState({
          isSuccessAuth: !!response,
          isValidForm: !!response,
        });
      });
  }

  render() {
    const {
      isSuccessAuth,
      password,
      login,
      isValidForm,
    } = this.state;
    if (isSuccessAuth) {
      return <Redirect to="/profile" />;
    }
    return (
      <div>
        <h3>Авторизация</h3>
        <form onSubmit={this.handleSubmit} className="registration__form registration-form">
          <div className="form-row">
            <label htmlFor="login" className="registration-form__label col-sm-2">{fieldsRegisterForm.login}</label>
            <input type="text" className="form-control col-sm-6" name="login" value={login} onChange={this.handleChange} required />
          </div>
          <div className="form-row">
            <label htmlFor="password" className="registration-form__label col-sm-2">{fieldsRegisterForm.password}</label>
            <input type="password" className="form-control col-sm-6" name="password" value={password} onChange={this.handleChange} required />
          </div>
          <div className={isValidForm ? 'd-none' : ''}>
            Неправильный логин или пароль
          </div>
          <input type="submit" value="Submit" className="btn btn-secondary" />
        </form>
      </div>
    );
  }
}

export default AuthForm;
