import React from 'react';
import moment from 'moment';
import { free } from '../../fixtures';
import { imageUrlRecources, globalRecources } from '../../resources';

const EventList = ({
  event,
  imgWrapClass,
  descrWrapClass,
  titleClass,
  descrClass,
  actionWrapClass,
  priceClass,
  placeClass,
  dateClass,
  ctaWrapClass,
  ctaClass,
  isOwner
}) => (
  <div className="row">
    <div className={imgWrapClass}>
      <img src={event.acf.picture || imageUrlRecources.noPhoto}
            alt={event.title.rendered}
            className="events-item__img" />
    </div>
    <div className={descrWrapClass}>
      <div className={titleClass} dangerouslySetInnerHTML={{ __html: event.title.rendered }} />
      <div className={descrClass} dangerouslySetInnerHTML={{ __html: event.excerpt.rendered }} />
      {!isOwner &&
        <div className="events-item__tags events-item-tags">
          {event.acf.tags ? event.acf.tags.split(',').map((tag) => <span key={tag} className="events-item-tags__tag">{tag}</span>) : ''}
        </div>
      }
    </div>
    <div className={actionWrapClass}>
      <div className={priceClass}>
        {!free.includes(event.acf.price) ? (event.acf.price + ' ' + event.acf.currency || '') : globalRecources.free}
      </div>
      <div className={placeClass}>
        {event.acf.cities} {event.acf.location}
      </div>
      <div className={dateClass}>
        {event.acf.dateOf ? moment(event.acf.dateOf, "YYYY-MM-DD").format("Do MMM YYYY") : ''}
      </div>
      <div className={ctaWrapClass}>
          <span className={ctaClass}>{globalRecources.moreInfo}</span>
          {isOwner &&
            <a className={ctaClass}>{globalRecources.change}</a>
          }
      </div>
    </div>
  </div>
);
export default EventList;
