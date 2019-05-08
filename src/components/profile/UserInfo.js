import React, { PureComponent, Fragment } from 'react';
import UserInfoData from './UserInfoData';
import { fieldsRegisterForm } from '../../resources';
import { profileProperties, addEventFields } from '../../resources/profile';

class UserInfo extends PureComponent {
  state = {
    isEditMode: false,
  }

  changeProfileInfo = () => {
    this.setState({
      isEditMode: true,
    });

    return true;
  }

  render() {
    const { user } = this.props;

    if (!user) {
      return <Fragment />;
    }

    const { isEditMode } = this.state;

    return (
      <div className="col-6">
        <h3>{profileProperties.title}</h3>
        <div className="row">
          <div className="col-6">
            <UserInfoData user={user} />
          </div>
          <div className="col-6">
            <button className="profile__add-button" onClick={this.changeProfileInfo} >
              {profileProperties.editProfileButton}
            </button>
            <p>
              {addEventFields.cityField}
              <br />
              <b>{user.city}</b>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default UserInfo;
