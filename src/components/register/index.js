import React, { PureComponent } from 'react';
import AuthForm from './AuthForm';
import RegisterForm from './RegisterForm';
import Adventages from '../global/Adventages';
import { globalRecources } from '../../resources/global';

class RegistrationPage extends PureComponent {
  state = {
    isSuccessRegister: false,
  };

  render() {
    const { isSuccessRegister } = this.state;
    const registerForm = (isSuccessRegister ? (
      <div>
        {globalRecources.successRegisterMsg}
        <br />
        <AuthForm />
      </div>) : (
        <RegisterForm />
    ));

    return (
      <div className="container">
        <Adventages />
        <div className="row">
          <div className="col-12 col-md-6">
            <AuthForm />
          </div>
          <div className="col-12 col-md-6 registration">
            {registerForm}
          </div>
        </div>
      </div>
    );
  }
}

export default RegistrationPage;
