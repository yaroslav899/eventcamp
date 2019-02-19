import React, { Component } from 'react';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import GoogleMap from './GoogleMap';
import { detailRecources } from '../../resources';

export default class DetailTabs extends Component {
  render() {
    const {
      data: {
        acf: {
          cities,
          location,
        },
        content: {
          rendered,
        }
      },
    } = this.props;
    const address = `${cities}, ${location}`;

    return (
      <Tabs>
        <TabList>
          <Tab>{detailRecources.description}</Tab>
          <Tab>{detailRecources.howToGet}</Tab>
        </TabList>
        <TabPanel>
          <div className="event_text" dangerouslySetInnerHTML={{ __html: rendered }} />
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
