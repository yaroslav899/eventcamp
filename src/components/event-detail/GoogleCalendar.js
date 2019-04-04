import React, { PureComponent, Fragment } from 'react';
import {
  urlRecources,
  detailRecources,
  globalRecources,
  imageUrlRecources,
} from '../../resources';

class GoogleCalendar extends PureComponent {
  render() {
    const { data } = this.props;
    if (!data) {
      return <Fragment>{globalRecources.loading}</Fragment>;
    }

    const date = data.acf.dateOf.replace(/-/ig, '');
    const location = `${data.acf.cities},${data.acf.location}`;
    const calGoggles = `${urlRecources.calGoggle}${encodeURI(data.title.rendered)}&dates=${date}T000000/${date}T235959&location=${encodeURI(location)}&details=${window.location.href}&trp=false&sprop=${encodeURI(location.href)}sprop=name:Event-camp`;

    return (
      <div className="calendar-link">
        <p>{detailRecources.addToCalendar}</p>
        <a href={calGoggles}>
          <img src="/img/google.png" alt="" />
        </a>
      </div>
    );
  }
}

export default GoogleCalendar;
