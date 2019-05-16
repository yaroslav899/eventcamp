import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import OwnEvents from './OwnEvents';
import UserImage from './UserImage';
import UserInfo from './UserInfo';
import TakingPartMember from './TakingPartMember';
import { setCookie } from '../../_cookie';
import { parseJSON, stringifyJSON } from '../../helper/json';
import { request } from '../../api';
import { mainMenu } from '../../resources/menu';
import { profileProperties } from '../../resources/profile';

class Profile extends PureComponent {
  state = {
    profileData: {},
  }

  componentDidMount() {
    return request.getProfileData()
      .then(response => {
        if (!response.success) {
          return false;
        }

        setCookie('profileData', stringifyJSON(response.userProfile));

        store.dispatch({
          type: 'UPDATE_USERPROFILE',
          data: response.userProfile,
        });
      });
  }

  render() {
    const { userProfile } = this.props;

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
                <Tab>{profileProperties.organizer}</Tab>
                <Tab>{profileProperties.participant}</Tab>
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

const mapStateToProps = (storeData) => {
  return {
    userProfile: storeData.user.data,
  };
};

export default connect(mapStateToProps)(Profile);
