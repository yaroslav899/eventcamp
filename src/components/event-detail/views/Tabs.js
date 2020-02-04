import React from 'react';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import GoogleMap from '../GoogleMap';
import EventLocation from '../../event-global/EventLocation';
import { createMarkupText } from '../../../helper';
import { detailRecources } from '../../../resources';

const DetailTabs = (props) => {
  const {
    data: {
      acf: {
        cities: eventCity,
        location: eventLocation,
      } = {},
      content: { rendered } = {},
    } = {},
    descriptionTabName,
    howToGetTabName,
  } = props;
  const address = `${eventCity}, ${eventLocation}`;

  return (
    <Tabs>
      <TabList>
        <Tab>{descriptionTabName}</Tab>
        <Tab>{howToGetTabName}</Tab>
      </TabList>
      <TabPanel>
        <div className="event_text" dangerouslySetInnerHTML={createMarkupText(rendered)} itemProp="description" />
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

DetailTabs.defaultProps = {
  descriptionTabName: detailRecources.description,
  howToGetTabName: detailRecources.howToGet,
};

export default DetailTabs;
