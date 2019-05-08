import React from 'react';
import { NavLink } from 'react-router-dom';
import EventLocation from '../event-global/EventLocation';
import EventDate from '../event-global/EventDate';
import EventMoreCTA from '../event-global/EventMoreCTA';
import EventChangeCTA from '../event-global/EventChangeCTA';
import { categories, cities } from '../../fixtures';
import { getValueFromParams, createMarkupText } from '../../helper';

const EventView = (data) => {
  const { event, isOwner, changeButton, moreInfoButton } = data;
  const { acf, id: eventID, title} = event;
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
        <div>
          <EventLocation city={acf.cities} address={acf.location} /> - <EventDate date={acf.dateOf} />
        </div>
      </div>
      <div className="col-3 text-right">
        <div className="events-item__action events-item-action">
          <EventMoreCTA to={eventUrl} target="_blank" />
          <EventChangeCTA url={editEventUrl} isOwner={isOwner} />
        </div>
      </div>
    </div>
  )
};

export default EventView;
