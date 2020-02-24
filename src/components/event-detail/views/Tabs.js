import React from 'react';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import GoogleMap from '../GoogleMap';
import { withTranslation } from 'react-multi-lang';
import EventLocation from '../../event-global/EventLocation';
import { createMarkupText } from '../../../helper';

const DetailTabs = ({ data = {}, t }) => {
  const {
    acf: {
      cities: eventCity,
      location: eventLocation,
    } = {},
    content: { rendered } = {},
  } = data;
  const address = `${eventCity}, ${eventLocation}`;

  return (
    <Tabs>
      <TabList>
        <Tab>{t('pdp.description')}</Tab>
        <Tab>{t('pdp.howToGet')}</Tab>
      </TabList>
      <TabPanel>
        <div className="event_text" dangerouslySetInnerHTML={createMarkupText(rendered)} />
      </TabPanel>
      <TabPanel>
        <div className="row">
          <div className="col-12 area-2_map">
            <EventLocation city={eventCity} address={eventLocation} />
            <GoogleMap address={address} />
          </div>
        </div>
      </TabPanel>
    </Tabs>
  );
};

export default withTranslation(DetailTabs);
