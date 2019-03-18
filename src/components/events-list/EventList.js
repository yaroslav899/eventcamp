import React, { Component } from 'react';
import moment from 'moment';
import { free } from '../../fixtures';
import { imageUrlRecources, globalRecources } from '../../resources';

export default class EventList extends Component {
  createMarkupText(text) {
    return { __html: text };
  }

  render() {
    const {
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
    } = this.props;
    const price = !free.includes(event.acf.price) ? (event.acf.price + ' ' + event.acf.currency || '') : globalRecources.free;
    const location = `${event.acf.cities}, ${event.acf.location}`;
    const date = event.acf.dateOf ? moment(event.acf.dateOf, "YYYY-MM-DD").format("Do MMM YYYY") : '';

    return (
      <div className="row">
        <div className={imgWrapClass}>
          <img src={event.acf.picture || imageUrlRecources.noPhoto}
            alt={event.title.rendered}
            className="events-item__img" />
        </div>
        <div className={descrWrapClass}>
          <div className={titleClass} dangerouslySetInnerHTML={this.createMarkupText(event.title.rendered)} />
          <div className={descrClass} dangerouslySetInnerHTML={this.createMarkupText(event.excerpt.rendered)} />
          {!isOwner &&
            <div className="events-item__tags events-item-tags">
              {event.acf.tags ? event.acf.tags.split(',').map((tag) => <span key={tag} className="events-item-tags__tag">{tag}</span>) : ''}
            </div>
          }
        </div>
        <div className={actionWrapClass}>
          <div className={priceClass}>
            {price}
          </div>
          <div className={placeClass}>
            {location}
          </div>
          <div className={dateClass}>
            {date}
          </div>
          <div className={ctaWrapClass}>
            <span className={ctaClass}>{globalRecources.moreInfo}</span>
            {isOwner &&
              <a className={ctaClass}>{globalRecources.change}</a>
            }
          </div>
        </div>
      </div>
    )
  }
}