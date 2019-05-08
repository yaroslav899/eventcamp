import React, { PureComponent } from 'react';
import EventLocation from '../event-global/EventLocation';
import EventDate from '../event-global/EventDate';
import EventPrice from '../event-global/EventPrice';
import EventTags from '../event-global/EventTags';
import Modal from '../global/Modal';
import GoogleCalendar from '../event-detail/GoogleCalendar';
import { NavLink } from 'react-router-dom';
import store from '../../store';
import { request } from '../../api';
import { getValueFromParams, createMarkupText } from '../../helper';
import { categories, cities } from '../../fixtures';
import { imageUrlRecources } from '../../resources/url';
import { globalRecources } from '../../resources/global';

class EventList extends PureComponent {
  state = {
    showModalBox: false,
    isAuthorized: false,
    isSubscribed: false,
  }

  componentDidMount() {
    const { event } = this.props;
    const { countmembers } = event.acf;
    const { user } = store.getState();
    const { data: userData } = user;

    if (Object.keys(userData).length) {
      this.setState({
        isSubscribed: countmembers && countmembers.includes(userData.email),
        isAuthorized: true,
      });
    }
  }

  handleGoToClick = (e) => {
    e.preventDefault();

    const { event } = this.props;
    const { isSubscribed } = this.state;
    const { user } = store.getState();
    const { data: userData } = user;
    const { email } = userData;

    if (Object.keys(userData).length) {
      // TODO send member who will go to the event
      let { countmembers } = event.acf;
      countmembers = isSubscribed ? countmembers.replace(email, '') : `${countmembers},${email}`;

      !isSubscribed && this.toggleModal();

      this.setState({
        isSubscribed: !isSubscribed,
      });

      return request.updatePostCountMembers(event, userData, countmembers);
    } else {
      this.toggleModal();

      return true;
    }
  }

  toggleModal = (data) => {
    this.setState(state => ({
      showModalBox: !state.showModalBox,
    }));
  }

  render() {
    const { event, imgWrapClass, descrWrapClass, actionWrapClass, interestedTitle, nonRegistredTitle, moreInfoButton, interestedButton } = this.props;
    const { isAuthorized, showModalBox, isSubscribed } = this.state;
    const city = getValueFromParams(cities, event.acf.cities, 'name', 'url');
    const category = getValueFromParams(categories, event.categories[0], 'id', 'url');
    const modalBody = isAuthorized ? interestedTitle : nonRegistredTitle;
    const url = `/events/${city}/${category}/${event.id}`;

    return (
      <div className="row">
        <NavLink to={url} className={imgWrapClass}>
          <img src={event.acf.picture || imageUrlRecources.noPhoto} alt={event.title.rendered} className="events-item__img" />
        </NavLink>
        <div className={descrWrapClass}>
          <NavLink to={url} className="events-item__title">
            <span dangerouslySetInnerHTML={createMarkupText(event.title.rendered)} />
          </NavLink>
          <div className="events-item__description" dangerouslySetInnerHTML={createMarkupText(event.excerpt.rendered)} />
          <div className="events-item__tags events-item-tags">
            <EventTags tags={event.acf.tags} />
          </div>
        </div>
        <div className={actionWrapClass}>
          <div className="events-item__price">
            <EventPrice price={event.acf.price} currency={event.acf.currency} />
          </div>
          <div className="events-item__location">
            <EventLocation city={event.acf.cities} address={event.acf.location} />
          </div>
          <div className="events-item__date">
            <EventDate date={event.acf.dateOf} />
          </div>
          <div className="events-item__action events-item-action">
            <NavLink to={url} className="events-item-action__button">
              {moreInfoButton}
            </NavLink>
            <span className={`events-item-action__button ${isSubscribed && 'action-button__active'}`} onClick={this.handleGoToClick}>
              {interestedButton}
            </span>
          </div>
        </div>
        {showModalBox &&
          <Modal
            toggleModal={this.toggleModal}
            title={event.title.rendered}
            body={modalBody}
            footer={isAuthorized ? <GoogleCalendar data={event} /> : ''}
          />
        }
      </div>
    )
  }
}

EventList.defaultProps = {
  interestedTitle: globalRecources.interestedTitle,
  nonRegistredTitle: globalRecources.nonRegistred,
  moreInfoButton: globalRecources.moreInfo,
  interestedButton: globalRecources.interestingCTA,
}

export default EventList;
