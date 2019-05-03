import React from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { globalRecources } from '../../resources/global';
import { categories, cities } from '../../fixtures';
import { getValueFromParams, createMarkupText } from '../../helper';

const EventView = (data) => {
  const { event, isOwner } = data;
  const { acf, id: eventID, title} = event;
  const city = getValueFromParams(cities, acf.cities, 'name', 'url');
  const category = getValueFromParams(categories, event.categories[0], 'id', 'url');
  const location = `${acf.cities}, ${acf.location}`;
  const date = acf.dateOf ? moment(acf.dateOf, "YYYY-MM-DD").format("Do MMM YYYY") : '';
  const eventUrl = `/events/${city}/${category}/${eventID}`;
  const editEventUrl = `/edit-event/${eventID}`;

  return (
    <div className="row">
      <div className="col-9">
        <NavLink to={eventUrl} className="events-item__title">
          <span dangerouslySetInnerHTML={createMarkupText(title.rendered)} />
        </NavLink>
        <div>{location} - {date}</div>
      </div>
      <div className="col-3 text-right">
        <div className="events-item__action events-item-action">
          <NavLink to={eventUrl} className="events-item-action__button" target="_blank">
            {globalRecources.moreInfo}
          </NavLink>
          {isOwner &&
            <NavLink to={editEventUrl} className="events-item-action__button">
              {globalRecources.change}
            </NavLink>
          }
        </div>
      </div>
    </div>
  )
};

export default EventView;
