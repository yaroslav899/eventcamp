import React from 'react';
import { NavLink } from 'react-router-dom';
import EventLocation from './EventLocation';
import EventDate from './EventDate';
import Button from '../global/Button';
import { categories } from '../../fixtures';
import { getValueFromParams, createMarkupText } from '../../helper';
import { globalRecources } from '../../resources/global';

const EventView = (data) => {
  const { event, isOwner } = data;
  const { acf: { cities, location, dateOf }, id: eventID, title } = event;
  const category = getValueFromParams(categories, event.categories[0], 'id', 'url');
  const eventUrl = `/events/${cities}/${category}/${eventID}`;
  const editEventUrl = `/edit-event/${eventID}`;

  return (
    <div className="row">
      <div className="col-8">
        <NavLink to={eventUrl} className="events-item__title">
          <span dangerouslySetInnerHTML={createMarkupText(title.rendered)} />
        </NavLink>
        <EventLocation className="inline" city={cities} address={location} /> - <EventDate className="inline" date={dateOf} />
      </div>
      <div className="col-4 text-right">
        <div className="events-item__action events-item-action">
          <Button text={globalRecources.moreInfo} to={eventUrl} target="_blank" />
          {isOwner
            && <Button text={globalRecources.change} to={editEventUrl} />
          }
        </div>
      </div>
    </div>
  );
};

export default EventView;
