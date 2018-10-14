import React from 'react';
import { free } from '../../fixtures';
import { globalRecources, imageUrlRecources } from '../../recources';

const EventDetail = ({ event, date }) => (
  <div className="row area-1">
    <div className="col-6 area-1_image">
      <img src={event.acf.picture || imageUrlRecources.noPhoto} alt={event.title.rendered} className="detail-picture" />
    </div>
    <div className="col-6 area-1_text">
      <div className="text-right area-1_price">
        {!free.includes(event.acf.price) ? (event.acf.price + '' + event.acf.currency || '') : globalRecources.free}
      </div>
      <div className="area-1_info">
        <span className="day">{date[0]}</span>
        <span className="month">{date[1]}</span>
        <span className="time">{event.acf.time}</span>
        <p className="area-1_tags">
          {event.acf.tags ? event.acf.tags.split(',').map((tag) => <span key={tag} className="tagOpt">{tag}</span>) : ''}
        </p>
        <p className="area-1_location">
          {event.acf.cities}, {event.acf.location}
        </p>
      </div>
    </div>
  </div>
);
export default EventDetail;