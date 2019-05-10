import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import store from '../../store';
import OwnEvents from './OwnEvents';
import UserImage from './UserImage';
import UserInfo from './UserInfo';
import TakingPartMember from './TakingPartMember';
import { request } from '../../api';
import { mainMenu } from '../../resources/menu';
import { profileProperties } from '../../resources/profile';

class Profile extends PureComponent {
  componentDidMount() {
    const { user: userData } = this.props;

    if (Object.keys(userData).length) {
      return false;
    }

    return request.getUserData().then(response => {
      if (!response) {
        return false;
      }

      store.dispatch({
        type: 'UPDATE_USERDATA',
        data: response,
      });
    });
  }

  render() {
    const { user } = this.props;

    return (
      <div className="container profile">
        <div className="row">
          <UserImage user={user} />
          <UserInfo user={user} />
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
                    <TakingPartMember user={user} />
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
    user: storeData.user.data,
  };
};

export default connect(mapStateToProps)(Profile);
