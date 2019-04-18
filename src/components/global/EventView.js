import React from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { globalRecources } from '../../resources';
import { categories, cities } from '../../fixtures';
import { getValueFromParams, createMarkupText } from '../../helper';

const EventView = (data) => {
  const { event, isOwner } = data;
  const city = getValueFromParams(cities, event.acf.cities, 'name', 'url');
  const category = getValueFromParams(categories, event.categories[0], 'id', 'url');
  const location = `${event.acf.cities}, ${event.acf.location}`;
  const date = event.acf.dateOf ? moment(event.acf.dateOf, "YYYY-MM-DD").format("Do MMM YYYY") : '';
  const url = `/events/${city}/${category}/${event.id}`;

  return (
    <div className="row">
      <div className="col-9">
        <NavLink to={url} className="events-item__title">
          <span dangerouslySetInnerHTML={createMarkupText(event.title.rendered)} />
        </NavLink>
        <div>{location} - {date}</div>
      </div>
      <div className="col-3 text-right">
        <div className="events-item__action events-item-action">
          <NavLink to={url} className="events-item-action__button" target="_blank">
            {globalRecources.moreInfo}
          </NavLink>
          {isOwner &&
            <span className="events-item-action__button">
              {globalRecources.change}
            </span>
          }
        </div>
      </div>
    </div>
  )
};

export default EventView;
