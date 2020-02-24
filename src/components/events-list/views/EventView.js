import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-multi-lang';
import EventImage from '../../event-global/EventImage';
import EventLocation from '../../event-global/EventLocation';
import EventDate from '../../event-global/EventDate';
import EventPrice from '../../event-global/EventPrice';
import EventTags from '../../event-global/EventTags';
import Button from '../../global/Button';
import { createMarkupText } from '../../../helper';

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
    t,
  } = props;

  return (
    <Fragment>
      <NavLink to={eventUrl} className={imgWrapClass}>
        <EventImage imgUrl={eventImgUrl} alt={eventTitle} />
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
          <Button text={t('global.button.open')} to={eventUrl} className="events-item-action__button" />
          <span className={`events-item-action__button ${isSubscribed && 'action-button__active'}`} onClick={subscribeHandler}>
            {t('global.button.follow')}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default withTranslation(EventView);
