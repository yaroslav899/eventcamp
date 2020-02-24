import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-multi-lang';
import { formValidator } from '../../validator';
import Loader from '../global/Loader';
import { getCookie } from '../../_cookie';
import { stringifyJSON, parseJSON } from '../../helper/json';
import { fetchProfileData } from '../../api';
import { fieldsRegisterForm } from '../../resources';

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
      const { user: { userID }, fetchProfileData, changeProfileInfo } = this.props;

      profileData.name = name;
      profileData.email = email;
      profileData.city = city;
      profileData.phone = phone;

      const bodyParam = {
        name,
        email,
        description: stringifyJSON(profileData),
      };

      return fetchProfileData(bodyParam, userID)
        .then(() => changeProfileInfo());
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

    const { nameLabel, emailLabel, t } = this.props;
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
              <label htmlFor="phone">{t('profile.field.label.phone')}</label>
              <input type="text" className="form-control" name="phone" value={phone} onChange={this.handleInputChange} />
            </p>
            <p>
              <label htmlFor="city">{t('profile.field.label.city')}</label>
              <input type="text" className="form-control" name="city" value={city} onChange={this.handleInputChange} />
            </p>
          </div>
          <div className="col-12">
            <span className="error-message">{errorMsg}</span>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-secondary submit" disabled={isSubmit}>
              {t('global.button.change')}
              {isSubmit && <Loader />}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { fetchProfileData: (bodyParam, userID) => dispatch(fetchProfileData(bodyParam, userID)) };
}

UserInfoEdit.defaultProps = {
  nameLabel: fieldsRegisterForm.firstname,
  emailLabel: fieldsRegisterForm.email,
};

export default withTranslation(connect(null, mapDispatchToProps)(UserInfoEdit));
