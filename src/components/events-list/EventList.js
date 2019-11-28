import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import EventView from './views/EventView';
import Modal from '../global/Modal';
import GoogleCalendar from '../event-detail/GoogleCalendar';
import { request } from '../../api';
import { updateUserProfile } from '../../redux/actions/userActions';
import { setCookie } from '../../_cookie';
import { getValueFromParams } from '../../helper';
import { categories } from '../../fixtures';
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

    if (userName && userEmail) {
      const { userProfile, event: { id: eventID } } = this.props;
      const { isSubscribed } = this.state;

      if (isSubscribed) {
        userProfile.subscribed = subscribed.replace(eventID, '');
      } else {
        userProfile.subscribed = subscribed.length ? `${subscribed},${eventID}` : `${eventID}`;
        this.toggleModal();
      }

      this.setState({ isSubscribed: !isSubscribed });

      const param = { description: JSON.stringify(userProfile) };

      return request.updateProfile(param, userID)
        .then((response) => {
          if (response.success) {
            const { updateUserProfile } = this.props;

            setCookie('profileData', JSON.stringify(response.userProfile), 2);
            updateUserProfile(response.userProfile);
          }

          return true;
        });
    }

    this.toggleModal();

    return true;
  }

  toggleModal = () => {
    this.setState(state => ({ showModalBox: !state.showModalBox }));
    return true;
  }

  render() {
    const {
      event,
      imgWrapClass,
      descrWrapClass,
      actionWrapClass,
      interestedTitle,
      nonRegistredTitle,
      noPhotoUrl,
    } = this.props;
    const {
      id: eventID,
      categories: eventCategories = ['it'],
      title: { rendered: eventTitle },
      excerpt: { rendered: eventShortDescription },
      acf: {
        picture,
        picture_url: pictureUrl,
        price: eventPrice = '',
        currency: eventCurrency = '',
        cities: eventCity,
        location: eventLocation,
        dateOf: eventDate,
        tags: eventTags,
      },
    } = event;
    const { isAuthorized, showModalBox, isSubscribed } = this.state;
    const eventCategory = getValueFromParams(categories, eventCategories[0], 'id', 'url');
    const eventUrl = `/events/${eventCity}/${eventCategory}/${eventID}`;
    const eventImgUrl = picture || pictureUrl || noPhotoUrl;

    return (
      <div className="row">
        <EventView
          eventUrl={eventUrl}
          imgWrapClass={imgWrapClass}
          eventImgUrl={eventImgUrl}
          eventTitle={eventTitle}
          descrWrapClass={descrWrapClass}
          eventShortDescription={eventShortDescription}
          eventTags={eventTags}
          actionWrapClass={actionWrapClass}
          eventPrice={eventPrice}
          eventCurrency={eventCurrency}
          eventCity={eventCity}
          eventLocation={eventLocation}
          eventDate={eventDate}
          isSubscribed={isSubscribed}
          subscribeHandler={this.subscribe}
        />
        {showModalBox
          && <Modal
            toggleModal={this.toggleModal}
            modalTitle={eventTitle}
            modalBody={isAuthorized ? interestedTitle : nonRegistredTitle}
            modalFooter={isAuthorized ? <GoogleCalendar data={event} /> : false}
          />
        }
      </div>
    );
  }
}

EventList.defaultProps = {
  interestedTitle: globalRecources.interestedTitle,
  nonRegistredTitle: globalRecources.nonRegistred,
  noPhotoUrl: imageUrlRecources.noPhoto,
};

const mapStateToProps = (storeData) => {
  return { userProfile: storeData.user.data };
};

const mapDispatchToProps = dispatch => {
  return { updateUserProfile: data => dispatch(updateUserProfile(data)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
