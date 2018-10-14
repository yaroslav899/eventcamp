import React from 'react';
import moment from 'moment';
import { free } from '../../fixtures';
import { imageUrlRecources, globalRecources } from '../../recources';

const EventList = ({ event }) => (
  <div className="row">
    <div className="col-3">
      <img src={event.acf.picture || imageUrlRecources.noPhoto}
            alt={event.title.rendered}
            className="events-item__img" />
    </div>
    <div className="col-6">
      <div className="events-item__title" dangerouslySetInnerHTML={{ __html: event.title.rendered }} />
      <div className="events-item__description" dangerouslySetInnerHTML={{ __html: event.excerpt.rendered }} />
      <div className="events-item__tags events-item-tags">
        {event.acf.tags ? event.acf.tags.split(',').map((tag) => <span key={tag} className="events-item-tags__tag">{tag}</span>) : ''}
      </div>
    </div>
    <div className="col-3">
      <div className="events-item__price">
        {!free.includes(event.acf.price) ? (event.acf.price + ' ' + event.acf.currency || '') : globalRecources.free}
      </div>
      <div className="events-item__location">
        {event.acf.cities} {event.acf.location}
      </div>
      <div className="events-item__date">
        {event.acf.dateOf ? moment(event.acf.dateOf, "YYYY-MM-DD").format("Do MMM YYYY") : ''}
      </div>
      <div className="events-item__action events-item-action">
        <button className="events-item-action__button">{globalRecources.moreInfo}</button>
      </div>
    </div>
  </div>
);
export default EventList;
