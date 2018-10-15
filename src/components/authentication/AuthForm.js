import React, { PureComponent } from 'react';
import { request } from '../../api';

class AuthForm extends PureComponent {
  state = {
    login: '',
    password: ''
  };

  handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
      event.preventDefault();
      request.authUser(this.state);
  }

  onChanges = (value) => {
      this.setState({ captcha: value })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label><span>Login:</span>
            <input type="text" name="login" value={this.state.login} onChange={this.handleChange} />
          </label><br />
          <label><span>Password:</span>
            <input type="text" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          </label><br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AuthForm;