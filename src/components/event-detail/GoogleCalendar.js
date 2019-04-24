import React, { Fragment } from 'react';
import { detailRecources } from '../../resources';
import { urlRecources, imageUrlRecources } from '../../resources/url';
import { globalRecources } from '../../resources/global';

const GoogleCalendar = (props) => {
  const { data } = props;

  if (!data) {
    return <Fragment>{globalRecources.loading}</Fragment>;
  }

  const date = data.acf.dateOf.replace(/-/ig, '');
  const location = `${data.acf.cities},${data.acf.location}`;
  const calGoggles = `${urlRecources.calGoggle}${encodeURI(data.title.rendered)}&dates=${date}T000000/${date}T235959&location=${encodeURI(location)}&details=${window.location.href}&trp=false&sprop=${encodeURI(location.href)}sprop=name:Event-camp`;

  return (
    <div className="calendar-link">
      <p>{detailRecources.addToCalendar}</p>
      <a href={calGoggles} target="_blank">
        <img src={imageUrlRecources.google} alt="" />
      </a>
    </div>
  );
};

export default GoogleCalendar;
