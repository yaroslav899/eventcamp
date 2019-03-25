import React, { PureComponent } from 'react';
import AuthForm from './AuthForm';
import RegisterForm from './RegisterForm';
import { formValidator } from '../../validator';
import Adventages from '../global/Adventages';
import { request } from '../../api';
import { globalRecources, fieldsRegisterForm } from '../../resources';

class RegistrationPage extends PureComponent {
  state = {
    isSuccessRegister: false,
  };

  render() {
    const {
      isSuccessRegister,
    } = this.state;

    const registerForm = (isSuccessRegister ? (
      <div>
        {globalRecources.successRegisterMsg}
        <br />
        <AuthForm />
      </div>) : (
      <RegisterForm />
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
