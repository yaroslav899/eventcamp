import React, { PureComponent } from 'react';
import {
  urlRecources,
  detailRecources,
  globalRecources,
  imageUrlRecources,
} from '../../resources';

export default class Calendar extends PureComponent {
  render() {
    const { data } = this.props;
    if (!data) {
      return <div>{globalRecources.loading}</div>;
    }

    const date = data.acf.dateOf.replace(/-/ig, '');
    const location = `${data.acf.cities},${data.acf.location}`;
    const calGoggles = `${urlRecources.calGoggle}${encodeURI(data.title.rendered)}&dates=${date}T000000/${date}T235959&location=${encodeURI(location)}&details=${window.location.href}&trp=false&sprop=${encodeURI(location.href)}sprop=name:Event-camp`;

    return (
      <div className="calendar-link">
        <p>{detailRecources.addToCalendar}</p>
        <a href={calGoggles}>
          <img src={imageUrlRecources.googleLogo} alt="" className="googleCal" />
        </a>
      </div>
    );
  }
}
