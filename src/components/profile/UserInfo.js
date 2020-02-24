import React, { PureComponent, Fragment } from 'react';
import { withTranslation } from 'react-multi-lang';
import UserInfoData from './UserInfoData';
import UserInfoEdit from './UserInfoEdit';

class UserInfo extends PureComponent {
  state = { isEditMode: false }

  changeProfileInfo = () => {
    this.setState(prevState => ({ isEditMode: !prevState.isEditMode }));

    return true;
  }

  render() {
    const { user, t } = this.props;

    if (!user) {
      return <Fragment />;
    }

    const { isEditMode } = this.state;

    return (
      <div className="col-12 col-sm-6">
        <div className="row">
          <div className="col-6">
            <h3>{t('title.profile')}</h3>
          </div>
          <div className="col-6">
            <button type="button" className="profile__add-button" onClick={this.changeProfileInfo}>
              {!isEditMode ? t('profile.button.editProfile') : t('global.button.cancel')}
            </button>
          </div>
        </div>
        {isEditMode ? <UserInfoEdit user={user} changeProfileInfo={this.changeProfileInfo} /> : <UserInfoData user={user} />}
      </div>
    );
  }
}

export default withTranslation(UserInfo);
