import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import EventLocation from '../event-global/EventLocation';
import EventDate from '../event-global/EventDate';
import EventPrice from '../event-global/EventPrice';
import EventTags from '../event-global/EventTags';
import Modal from '../global/Modal';
import GoogleCalendar from '../event-detail/GoogleCalendar';
import { NavLink } from 'react-router-dom';
import { request } from '../../api';
import store from '../../store';
import { setCookie } from '../../_cookie';
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
    const { userProfile } = this.props;
    const { name, email } = userProfile;

    if (name.length && email.length) {
      const { event: { id: eventID } } = this.props;
      const { subscribed } = userProfile;

      this.setState({
        isSubscribed: subscribed.split(',').includes(String(eventID)),
        isAuthorized: true,
      });
    }
  }

  subscribe = (e) => {
    e.preventDefault();

    const {
      userProfile: {
        name: userName,
        email: userEmail,
        userID,
        subscribed,
      },
    } = this.props;

    if (userName, userEmail) {
      const { userProfile, event: { id: eventID } } = this.props;
      const { isSubscribed } = this.state;

      if (isSubscribed){
        userProfile.subscribed = subscribed.replace(eventID, '');
      } else {
        userProfile.subscribed = subscribed.length ? `${subscribed},${eventID}` : `${eventID}`;
      }

      !isSubscribed && this.toggleModal();

      this.setState({
        isSubscribed: !isSubscribed,
      });

      const param = {
        description: JSON.stringify(userProfile)
      };

      return request.updateProfile(param, userID)
        .then((response) => {
            if (response.success) {
              setCookie('profileData', JSON.stringify(response.userProfile));

              store.dispatch({
                type: 'UPDATE_USERPROFILE',
                data: response.userProfile,
              });
            }

            return true;
        });
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
            <span className={`events-item-action__button ${isSubscribed && 'action-button__active'}`} onClick={this.subscribe}>
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

const mapStateToProps = function (storeData) {
  return {
    userProfile: storeData.user.data,
  }
};

export default connect(mapStateToProps)(EventList);
