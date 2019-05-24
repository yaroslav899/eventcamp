import React from 'react';
import { NavLink } from 'react-router-dom';
import EventLocation from './EventLocation';
import EventDate from './EventDate';
import Button from '../global/Button';
import { categories, cities } from '../../fixtures';
import { getValueFromParams, createMarkupText } from '../../helper';
import { globalRecources } from '../../resources/global';

const EventView = (data) => {
  const { event, isOwner } = data;
  const { acf, id: eventID, title } = event;
  const city = getValueFromParams(cities, acf.cities, 'name', 'url');
  const category = getValueFromParams(categories, event.categories[0], 'id', 'url');
  const eventUrl = `/events/${city}/${category}/${eventID}`;
  const editEventUrl = `/edit-event/${eventID}`;

  return (
    <div className="row">
      <div className="col-9">
        <NavLink to={eventUrl} className="events-item__title">
          <span dangerouslySetInnerHTML={createMarkupText(title.rendered)} />
        </NavLink>
        <EventLocation className="inline" city={acf.cities} address={acf.location} /> - <EventDate className="inline" date={acf.dateOf} />
      </div>
      <div className="col-3 text-right">
        <div className="events-item__action events-item-action">
          <Button text={globalRecources.moreInfo} to={eventUrl} target="_blank" />
          {isOwner
            && <Button text={globalRecources.change} to={editEventUrl} />
          }
        </div>
      </div>
    </div>
  )
};

export default EventView;
