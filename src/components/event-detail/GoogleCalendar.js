import React, { Fragment } from 'react';
import { detailRecources } from '../../resources';
import { urlRecources, imageUrlRecources } from '../../resources/url';

const GoogleCalendar = (props) => {
  const { data, addToCalendarMsg, googleCalendarImage } = props;

  if (!data) {
    return <Fragment />;
  }

  const {
    title: {
      rendered: eventTitle,
    },
    acf: {
      dateOf,
      cities,
      location: address,
    }
  } = data;
  const date = dateOf.replace(/-/ig, '');
  const location = `${cities},${address}`;
  const addToGoogleCalendarUrl = `${urlRecources.calGoggle}${encodeURI(eventTitle)}&dates=${date}T000000/${date}T235959&location=${encodeURI(location)}&details=${window.location.href}&trp=false&sprop=${encodeURI(location.href)}sprop=name:Event-camp`;

  return (
    <div className="calendar-link">
      <p>{addToCalendarMsg}</p>
      <a href={addToGoogleCalendarUrl} target="_blank">
        <img src={googleCalendarImage} alt={eventTitle} />
      </a>
    </div>
  );
};

GoogleCalendar.defaultProps = {
  addToCalendarMsg: detailRecources.addToCalendar,
  googleCalendarImage: imageUrlRecources.google,
}

export default GoogleCalendar;
