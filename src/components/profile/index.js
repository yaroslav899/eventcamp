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
import { getCookie } from '../../_cookie';
import { parseJSON } from '../../helper/json';
import { request } from '../../api';
import { mainMenu } from '../../resources/menu';
import { profileProperties } from '../../resources/profile';

class Profile extends PureComponent {
  state = {
    profileData: null,
  }

  componentDidMount() {
    return request.getProfileData().then(response => {
      if (!response) {
        return false;
      }

      this.setState({
        profileData: response,
      })
    });
  }

  render() {
    const { userData } = this.props;
    const { profileData } = this.state;

    return (
      <div className="container profile">
        <div className="row">
          <UserImage user={userData} />
          <UserInfo user={profileData} />
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
                    <TakingPartMember user={userData} />
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

Profile.defaultProps = {
  userData: parseJSON(getCookie('userData')),
}

export default Profile;
