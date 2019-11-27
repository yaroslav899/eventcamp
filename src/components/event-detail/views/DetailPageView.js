import React from 'react';
import Adventages from '../../global/Adventages';
import EventDetail from '../EventDetail';
import Tabs from './Tabs';
import SocialShare from '../SocialShare';
import GoogleCalendar from '../GoogleCalendar';
import FeedBack from '../FeedBack';
import DetailInteresting from '../DetailInteresting';

const DetailPageView = ({ event, date, dateDay }) => (
  <div className="container">
    <Adventages />
    <div className="row">
      <div className="col-12 col-md-9 event-detail">
        <h1 dangerouslySetInnerHTML={{ __html: event.title.rendered }} />
        <EventDetail event={event} date={date} dateDay={dateDay} />
        <div className="row area-2">
          <div className="col-12">
            <Tabs data={event} />
          </div>
        </div>
      </div>
      <div className="col-12 col-md-3 right-side">
        <SocialShare data={event} />
        <div className="border-separate" />
        <GoogleCalendar data={event} />
        <div className="border-separate" />
        <FeedBack data={event} />
        <div className="border-separate" />
        <DetailInteresting data={event} />
      </div>
    </div>
  </div>
);

export default DetailPageView;
