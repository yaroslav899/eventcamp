import React from 'react';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import OwnEvents from './OwnEvents';
import { profileProperties } from '../../resources/profile';

const TabProfileEvents = (userData, addEventUrl) => (
  <Tabs>
    <TabList>
      <Tab>{profileProperties.organizer}</Tab>
      <Tab>{profileProperties.participant}</Tab>
    </TabList>
    <TabPanel>
      <div className="row">
        <div className="col-12">
          <OwnEvents
            userData={userData}
            addEvent={addEventUrl}
          />
        </div>
      </div>
    </TabPanel>
    <TabPanel>
      <div className="row">
        <div className="col-12">
          {profileProperties.organizer}
        </div>
      </div>
    </TabPanel>
  </Tabs>
);
export default TabProfileEvents;
