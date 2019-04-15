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
      ctaClass: 'events-item-action__button ',
  }

  handleGoToClick = (e) => {
    e.preventDefault();
    const { event } = this.props;
    const {
      user: {
        data: userData = null,
      } = {},
    } = store.getState();

    if (Object.keys(userData).length) {
      // TODO send member who will go to the event
      request.updatePost(event).then(() => {
        this.toggleModal();
        this.setState({
            ctaClass: 'events-item-action__button action-button__active'
        });

      });
    } else {
      this.toggleModal();
    }
  }

  toggleModal = (data) => {
    this.setState(state => ({
      showModalBox: !state.showModalBox,
    }));
  }

  createMarkupText(text) {
    return { __html: text };
  }

  render() {
    const { event, imgWrapClass, descrWrapClass, actionWrapClass } = this.props;
    const {
        acf: {
            countmembers,
        },
    } = event;
    const city = getValueFromParams(cities, event.acf.cities, 'name', 'url');
    const category = getValueFromParams(categories, event.categories[0], 'id', 'url');
    const price = !free.includes(event.acf.price) ? (event.acf.price + ' ' + event.acf.currency || '') : globalRecources.free;
    const location = `${event.acf.cities}, ${event.acf.location}`;
    const date = event.acf.dateOf ? moment(event.acf.dateOf, "YYYY-MM-DD").format("Do MMM YYYY") : '';
    const {
      user: {
        data: userData,
      } = {},
    } = store.getState();
    const isUserTakeAPart = countmembers && countmembers.indexOf(userData.email);
    const modalBody = Object.keys(userData).length ? `Вы подтвердили свое участие в мероприятии. Подробная информация в личном кабинете` :
      'Необходимо зарегистрироватьсяс, чтобы подтвердить участие';

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
          <div className="events-item__tags events-item-tags">
            {tags}
          </div>
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
            <span className={this.state.ctaClass} onClick={this.handleGoToClick}>
              Иду +
            </span>
          </div>
        </div>
        {this.state.showModalBox &&
          <Modal
            toggleModal={this.toggleModal}
            title={event.title.rendered}
            body={modalBody}
            footer={Object.keys(userData).length ? <GoogleCalendar data={event} /> : ''}
          />
        }
      </div>
    )
  }
}
