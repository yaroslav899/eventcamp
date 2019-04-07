import React, { PureComponent } from 'react';
import moment from 'moment';
import { request } from '../../api';
import Modal from '../global/Modal';
import GoogleCalendar from '../event-detail/GoogleCalendar';
import { NavLink } from 'react-router-dom';
import store from '../../store';
import { getUniqueArray } from '../../helper';
import { imageUrlRecources, globalRecources } from '../../resources';
import { free, categories, cities } from '../../fixtures';
import { getValueFromParams, updateFilterStore } from '../../helper';

export default class EventList extends PureComponent {
  state = {
      showModalBox: false,
  }

  handleGoToClick = (e) => {
    e.preventDefault();
    const { event } = this.props;
    const {
      user: {
        data: userData = null,
      } = {},
    } = store.getState();

    if (!this.props.isOwner && userData) {
      console.log('2');
      // TODO send member who will go to the event
      request.updatePost(event.id).then(() => {
        this.toggleModal();
      });
      
    }
  }

  toggleModal = () => {
    this.setState(state => ({
      showModalBox: !state.showModalBox,
    }));
  }

  createMarkupText(text) {
    return { __html: text };
  }

  render() {
    const { event, imgWrapClass, descrWrapClass, actionWrapClass, isOwner } = this.props;
    const city = getValueFromParams(cities, event.acf.cities, 'name', 'url');
    const category = getValueFromParams(categories, event.categories[0], 'id', 'url');
    const price = !free.includes(event.acf.price) ? (event.acf.price + ' ' + event.acf.currency || '') : globalRecources.free;
    const location = `${event.acf.cities}, ${event.acf.location}`;
    const date = event.acf.dateOf ? moment(event.acf.dateOf, "YYYY-MM-DD").format("Do MMM YYYY") : '';
    const modalBody = `Вы подтвердили свое участие в мероприятии. Подробная информация в личном кабинете`;

    let tags = event.acf.tags || '';

    if (tags.length) {
        tags = getUniqueArray(tags.split(','));
        tags = tags.map((tag) => <span key={tag} className="events-item-tags__tag">{tag}</span>);
    }
    const url = `/events/${city}/${category}/${event.id}`;

    return (
      <div className="row">
        <NavLink to={url} className={imgWrapClass}>
          <img src={event.acf.picture || imageUrlRecources.noPhoto}
            alt={event.title.rendered}
            className="events-item__img" />
        </NavLink>
        <div className={descrWrapClass}>
          <NavLink to={url} className="events-item__title">
            <span dangerouslySetInnerHTML={this.createMarkupText(event.title.rendered)} />
          </NavLink>
          <div className="events-item__description" dangerouslySetInnerHTML={this.createMarkupText(event.excerpt.rendered)} />
          {!isOwner &&
            <div className="events-item__tags events-item-tags">
              {tags}
            </div>
          }
        </div>
        <div className={actionWrapClass}>
          <div className="events-item__price">
            {price}
          </div>
          <div className="events-item__location">
            {location}
          </div>
          <div className="events-item__date">
            {date}
          </div>
          <div className="events-item__action events-item-action">
            <NavLink to={url} className="events-item-action__button">
              {globalRecources.moreInfo}
            </NavLink>
            <span className="events-item-action__button" onClick={this.handleGoToClick}>
              {!isOwner ? `Иду +` : globalRecources.change}
            </span>
          </div>
        </div>
        {this.state.showModalBox &&
          <Modal
            toggleModal={this.toggleModal}
            title={event.title.rendered}
            body={modalBody}
            footer={<GoogleCalendar data={event} />}
          />
        }
      </div>
    )
  }
}
