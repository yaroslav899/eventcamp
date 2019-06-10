import React, { PureComponent, Fragment } from 'react';
import { formValidator } from '../../validator';
import store from '../../store';
import Loader from '../global/Loader';
import { setCookie, getCookie } from '../../_cookie';
import { stringifyJSON, parseJSON } from '../../helper/json';
import { request } from '../../api';
import { fieldsRegisterForm } from '../../resources';
import { globalRecources } from '../../resources/global';
import { addEventFields } from '../../resources/profile';

class UserInfoEdit extends PureComponent {
  state = {
    name: '',
    email: '',
    phone: '',
    city: '',
    errorMsg: '',
    isSubmit: false,
  };

  // ToDo check what the better, create getDerivedStateFromProps and change state isUpdated or that
  componentDidMount() {
    const {
      user: {
        name,
        email,
        phone,
        city,
      },
    } = this.props;

    this.setState({
      name: name || '',
      email: email || '',
      phone: phone || '',
      city: city || '',
    });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ isSubmit: true }, () => {
      const checkValidForm = this.validator();

      if (!checkValidForm.success) {
        this.setState({ errorMsg: checkValidForm.errorMsg });
        return false;
      }

      const profileData = parseJSON(getCookie('profileData'));
      const { name, email, phone, city } = this.state;
      const {
        user: { userID },
        changeProfileInfo,
      } = this.props;

      profileData.name = name;
      profileData.email = email;
      profileData.city = city;
      profileData.phone = phone;

      const param = {
        name,
        email,
        description: stringifyJSON(profileData),
      };

      return request.updateProfile(param, userID)
        .then((response) => {
          if (response.success) {
            setCookie('profileData', stringifyJSON(response.userProfile), 2);

            store.dispatch({
              type: 'UPDATE_USERPROFILE',
              data: response.userProfile,
            });

            changeProfileInfo();
          }

          return true;
        });
    });
  }

  validator = () => {
    const { name: nameValue, email: emailValue } = this.state;
    const { nameLabel, emailLabel } = this.props;
    const fields = {
      name: {
        value: nameValue,
        name: nameLabel,
        rules: ['isMandatory'],
      },
      email: {
        value: emailValue,
        name: emailLabel,
      },
    };

    return formValidator(fields);
  }

  render() {
    const { user } = this.props;

    if (!user) {
      return <Fragment />;
    }

    const { nameLabel, emailLabel, phoneLabel, cityLabel } = this.props;
    const {
      name,
      email,
      phone,
      city,
      errorMsg,
      isSubmit,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-row">
          <div className="col-6">
            <p>
              <label htmlFor="name">{nameLabel}</label>
              <input type="text" className="form-control" name="name" value={name} onChange={this.handleInputChange} />
            </p>
            <p>
              <label htmlFor="email">{emailLabel}</label>
              <input type="text" className="form-control" name="email" value={email} onChange={this.handleInputChange} />
            </p>
          </div>
          <div className="col-6">
            <p>
              <label htmlFor="phone">{phoneLabel}</label>
              <input type="text" className="form-control" name="phone" value={phone} onChange={this.handleInputChange} />
            </p>
            <p>
              <label htmlFor="city">{cityLabel}</label>
              <input type="text" className="form-control" name="city" value={city} onChange={this.handleInputChange} />
            </p>
          </div>
          <div className="col-12">
            <span className="error-message">{errorMsg}</span>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-secondary submit" disabled={isSubmit}>
              {globalRecources.change}
              {isSubmit && <Loader />}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

UserInfoEdit.defaultProps = {
  nameLabel: fieldsRegisterForm.firstname,
  emailLabel: fieldsRegisterForm.email,
  phoneLabel: addEventFields.phoneField,
  cityLabel: addEventFields.cityField,
};

export default UserInfoEdit;
