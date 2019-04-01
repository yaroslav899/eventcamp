import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import store from '../../store';
import OwnEvents from './OwnEvents';
import UserInfo from './UserInfo';
import TabProfileEvents from './TabProfileEvents';
import { request } from '../../api';
import { mainMenu } from '../../resources';
import { profileProperties } from '../../resources/profile';

class Profile extends Component {
  render() {
    const addEventPageID = '3';
    const addEventUrl = mainMenu.find((menu) => menu.id === addEventPageID).url;
    const { user } = this.props;


    return (
      <div className="container profile">
        <UserInfo
          user={user}
          addEventUrl={addEventUrl}
        />
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
                  {profileProperties.participant}
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

const mapStateToProps = function (store) {
  return {
    user: store.user.data,
  };
};

export default connect(mapStateToProps)(Profile);
