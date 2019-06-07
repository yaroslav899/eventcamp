import React, { PureComponent, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { request } from '../../api';
import store from '../../store';
import Loader from '../global/Loader';
import { setCookie } from '../../_cookie';
import { stringifyJSON } from '../../helper/json';
import { fieldsRegisterForm, fieldsMsg } from '../../resources';
import { globalRecources, titleList } from '../../resources/global';

class AuthForm extends PureComponent {
  state = {
    login: '',
    password: '',
    isSubmit: false,
    isSuccessAuth: false,
    isValidForm: true,
  };

  handleChange = (event) => {
    this.setState({
      isValidForm: true,
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ isSubmit: true }, () => {
      return request.authUser(this.state)
        .then((response) => {
          if (!response.success) {
            this.setState({
              isValidForm: false,
              isSubmit: false,
            });

            return false;
          }

          setCookie('userData', stringifyJSON(response.userData), 2);
          setCookie('profileData', stringifyJSON(response.profileData), 2);

          store.dispatch({
            type: 'UPDATE_USERPROFILE',
            data: response.profileData,
          });

          this.setState({
            isSuccessAuth: true,
            isSubmit: false,
          });

          return true;
        });
    });
  }

  render() {
    const { login, password, isSuccessAuth, isValidForm, isSubmit } = this.state;

    if (isSuccessAuth) {
      return <Redirect to="/profile" />;
    }

    return (
      <Fragment>
        <h3>{titleList.authorization}</h3>
        <form onSubmit={this.handleSubmit} className="registration__form registration-form">
          <div className="form-row">
            <label htmlFor="login" className="registration-form__label col-sm-4">
              {fieldsRegisterForm.login}
            </label>
            <input type="text" className="form-control col-sm-7" name="login" value={login} onChange={this.handleChange} required />
          </div>
          <div className="form-row">
            <label htmlFor="password" className="registration-form__label col-sm-4">
              {fieldsRegisterForm.password}
            </label>
            <input type="password" className="form-control col-sm-7" name="password" value={password} onChange={this.handleChange} required />
          </div>
          <div className={isValidForm ? 'd-none' : 'error-message'}>
            {fieldsMsg.errorMsg}
          </div>
          <button type="submit" className="btn btn-secondary submit" disabled={isSubmit}>
            {globalRecources.sendText}
            {isSubmit && <Loader />}
          </button>
        </form>
      </Fragment>
    );
  }
}

export default AuthForm;
