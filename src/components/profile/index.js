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
import UserInfo from './UserInfo';
import TabProfileEvents from './TabProfileEvents';
import { request } from '../../api';
import { mainMenu } from '../../resources';

class Profile extends PureComponent {
  render() {
    const addEventPageID = '3',
          addEventUrl = mainMenu.find((menu) => menu.id === addEventPageID).url;
    const {
      props: {
        user,
        userData,
      },
    } = this;

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
                <Tab>Организатор</Tab>
                <Tab>Участник</Tab>
              </TabList>
              <TabPanel>
                <div className="row">
                  <div className="col-12">
                    <OwnEvents
                      addEvent={addEventUrl}
                    />
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="row">
                  <div className="col-12">
                    Организатор
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
    user: store.user.state,
    userData: store.user.userData,
  };
};

export default connect(mapStateToProps)(Profile);
