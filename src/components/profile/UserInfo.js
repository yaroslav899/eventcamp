import React, { PureComponent, Fragment } from 'react';
import UserInfoData from './UserInfoData';
import UserInfoEdit from './UserInfoEdit';
import { profileProperties } from '../../resources/profile';

class UserInfo extends PureComponent {
  state = { isEditMode: false }

  changeProfileInfo = () => {
    this.setState(prevState => ({ isEditMode: !prevState.isEditMode }));

    return true;
  }

  render() {
    const { user } = this.props;

    if (!user) {
      return <Fragment />;
    }

    const { isEditMode } = this.state;

    return (
      <div className="col-12 col-sm-6">
        <div className="row">
          <div className="col-6">
            <h3>{profileProperties.title}</h3>
          </div>
          <div className="col-6">
            <button type="button" className="profile__add-button" onClick={this.changeProfileInfo}>
              {!isEditMode ? profileProperties.editProfileButton : profileProperties.cancelEditProfileButton}
            </button>
          </div>
        </div>
        {isEditMode ? <UserInfoEdit user={user} changeProfileInfo={this.changeProfileInfo} /> : <UserInfoData user={user} />}
      </div>
    );
  }
}

export default UserInfo;
