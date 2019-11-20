import React, { Fragment }  from 'react';
import { NavLink } from 'react-router-dom';
import EventLocation from '../../event-global/EventLocation';
import EventDate from '../../event-global/EventDate';
import EventPrice from '../../event-global/EventPrice';
import EventTags from '../../event-global/EventTags';
import Button from '../../global/Button';
import { createMarkupText } from '../../../helper';
import { globalRecources } from '../../../resources/global';

const EventView = (props) => {
  const {
    eventUrl,
    imgWrapClass,
    eventImgUrl,
    eventTitle,
    descrWrapClass,
    eventShortDescription,
    eventTags,
    actionWrapClass,
    eventPrice,
    eventCurrency,
    eventCity,
    eventLocation,
    eventDate,
    isSubscribed,
    subscribeHandler,
    moreInfoButton,
    interestedButton,
  } = props;

  return (
    <Fragment>
      <NavLink to={eventUrl} className={imgWrapClass}>
        <img src={eventImgUrl} alt={eventTitle} />
      </NavLink>
      <div className={descrWrapClass}>
        <NavLink to={eventUrl} className="events-item__title">
          <span dangerouslySetInnerHTML={createMarkupText(eventTitle)} />
        </NavLink>
        <div className="events-item__description" dangerouslySetInnerHTML={createMarkupText(eventShortDescription)} />
        <EventTags className="events-item__tags events-item-tags" tags={eventTags} />
      </div>
      <div className={actionWrapClass}>
        <EventPrice className="events-item__price" price={eventPrice} currency={eventCurrency} />
        <EventLocation className="events-item__location" city={eventCity} address={eventLocation} />
        <EventDate className="events-item__date" date={eventDate} />
        <div className="events-item__action events-item-action">
          <Button text={moreInfoButton} to={eventUrl} className="events-item-action__button" />
          <span className={`events-item-action__button ${isSubscribed && 'action-button__active'}`} onClick={subscribeHandler}>
            {interestedButton}
          </span>
        </div>
      </div>
    </Fragment>
  )
};

EventView.defaultProps = {
    moreInfoButton: globalRecources.moreInfo,
    interestedButton: globalRecources.interestingCTA,
  };

export default EventView;
