import React from 'react';
import { NavLink } from 'react-router-dom';
import EventLocation from '../../event-global/EventLocation';
import EventDate from '../../event-global/EventDate';
import EventPrice from '../../event-global/EventPrice';
import { createMarkupText } from '../../../helper';

const DetailInterestingEvent = (props) => {
  const {
    eventID,
    eventUrl,
    eventImgUrl,
    eventTitle,
    eventPrice,
    eventCurrency,
    eventCity,
    eventLocation,
    eventDate,
  } = props;

  return (
    <li key={eventID}>
      <NavLink to={eventUrl}>
        <div className="row">
          <div className="col-12">
            <img src={eventImgUrl} alt={eventTitle} />
            <div className="samePost-info-rightside row">
              <div className="col-7" dangerouslySetInnerHTML={createMarkupText(eventTitle)} />
              <EventPrice className="text-right col-5" price={eventPrice} currency={eventCurrency} />
              <EventLocation className="col-7" city={eventCity} address={eventLocation} />
              <EventDate className="text-right col-5" date={eventDate} />
            </div>
          </div>
        </div>
      </NavLink>
    </li>
  );
};

export default DetailInterestingEvent;
