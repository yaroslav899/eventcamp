import React from 'react';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import { withTranslation } from 'react-multi-lang';
import OwnEvents from './OwnEvents';

const TabProfileEvents = (userData, addEventUrl, t) => (
  <Tabs>
    <TabList>
      <Tab>{t('profile.global.organizer')}</Tab>
      <Tab>{t('profile.global.participant')}</Tab>
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
          {t('profile.global.organizer')}
        </div>
      </div>
    </TabPanel>
  </Tabs>
);

export default withTranslation(TabProfileEvents);
