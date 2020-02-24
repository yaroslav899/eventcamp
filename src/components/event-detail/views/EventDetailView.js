import React, { Fragment } from 'react';
import { withTranslation } from 'react-multi-lang';
import EventImage from '../../event-global/EventImage';
import EventPrice from '../../event-global/EventPrice';
import EventTags from '../../event-global/EventTags';
import EventLocation from '../../event-global/EventLocation';

const EventDetailView = (props) => {
  const {
    eventImgUrl,
    eventTitle,
    eventPrice,
    eventCurrency,
    eventDay,
    eventMonth,
    eventTime,
    eventDateDayCyrillic,
    eventTags,
    eventCity,
    eventLocation,
    isSubscribed,
    subscribeHandler,
    t,
  } = props;

  return (
    <Fragment>
      <div className="col-12 col-md-6 area-1_image">
        <EventImage imgUrl={eventImgUrl} alt={eventTitle} className="detail-picture" />
      </div>
      <div className="col-12 col-md-6 area-1_text">
        <EventPrice className="text-right area-1_price" price={eventPrice} currency={eventCurrency} />
        <div className="area-1_info">
          <span className="day">{eventDay}</span>
          <span className="month">{eventMonth}</span>
          <span className="time">{eventTime}</span>
          <p>{eventDateDayCyrillic}</p>
          <EventTags className="area-1_tags" tags={eventTags} />
          <EventLocation className="area-1_location" city={eventCity} address={eventLocation} />
          <p className="area-1_interesting">
            <span className={isSubscribed ? 'm-active' : ''} onClick={subscribeHandler}>
              {t('global.button.follow')}
            </span>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default withTranslation(EventDetailView);
