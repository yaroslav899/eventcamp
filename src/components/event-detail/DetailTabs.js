import React, { PureComponent } from 'react';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import GoogleMap from './GoogleMap';
import { createMarkupText } from '../../helper';
import { detailRecources } from '../../resources';

class DetailTabs extends PureComponent {
  render() {
    const {
      data: {
        acf: {
          cities,
          location,
        } = {},
        content: {
          rendered,
        } = {},
      } = {},
    } = this.props;
    const address = `${cities}, ${location}`;

    return (
      <Tabs>
        <TabList>
          <Tab>{detailRecources.description}</Tab>
          <Tab>{detailRecources.howToGet}</Tab>
        </TabList>
        <TabPanel>
          <div className="event_text" dangerouslySetInnerHTML={createMarkupText(rendered)} />
        </TabPanel>
        <TabPanel>
          <div className="row">
            <div className="col-7">
              <GoogleMap address={address} />
            </div>
            <div className="col-5 area-2_address">
              {address}
              <br />
            </div>
          </div>
        </TabPanel>
      </Tabs>
    );
  }
}

export default DetailTabs;
