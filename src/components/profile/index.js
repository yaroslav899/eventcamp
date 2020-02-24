import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import { withTranslation } from 'react-multi-lang';
import OwnEvents from './OwnEvents';
import UserImage from './UserImage';
import UserInfo from './UserInfo';
import TakingPartMember from './TakingPartMember';
import { setCookie } from '../../_cookie';
import { updateUserProfile } from '../../redux/actions/userActions';
import { stringifyJSON } from '../../helper/json';
import { request } from '../../api';

class Profile extends PureComponent {
  componentDidMount() {
    return request.getProfileData()
      .then((response) => {
        if (!response.success) {
          return false;
        }

        const { updateUserProfile } = this.props;

        setCookie('profileData', stringifyJSON(response.userProfile), 2);
        updateUserProfile(response.userProfile);

        return true;
      });
  }

  render() {
    const { userProfile, t } = this.props;

    return (
      <div className="container profile">
        <div className="row">
          <UserImage user={userProfile} />
          <UserInfo user={userProfile} />
        </div>
        <div className="row">
          <div className="col-12">
            <Tabs>
              <TabList>
                <Tab>{t('profile.global.organizer')}</Tab>
                <Tab>{t('profile.global.participant')}</Tab>
              </TabList>
              <TabPanel>
                <div className="row">
                  <div className="col-12">
                    <OwnEvents />
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="row">
                  <div className="col-12">
                    <TakingPartMember user={userProfile} />
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return { userProfile: store.user.data };
}

function mapDispatchToProps(dispatch) {
  return { updateUserProfile: data => dispatch(updateUserProfile(data)) };
}

export default withTranslation(connect(mapStateToProps, mapDispatchToProps)(Profile));
