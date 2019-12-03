import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Modal from '../global/Modal';
import GoogleCalendar from './GoogleCalendar';
import EventDetailView from './views/EventDetailView';
import { fetchProfileData } from '../../api';
import { imageUrlRecources } from '../../resources/url';
import { globalRecources } from '../../resources/global';

class EventDetail extends PureComponent {
  state = {
    showModalBox: false,
    isSubscribed: false,
    isAuthorized: false,
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
      const { userProfile, event: { id: eventID }, fetchProfileData } = this.props;
      const { isSubscribed } = this.state;

      if (isSubscribed) {
        userProfile.subscribed = subscribed.replace(eventID, '');
      } else {
        userProfile.subscribed = subscribed.length ? `${subscribed},${eventID}` : `${eventID}`;
        this.toggleModal();
      }

      this.setState({ isSubscribed: !isSubscribed });

      const bodyParam = { description: JSON.stringify(userProfile) };

      return fetchProfileData(bodyParam, userID);
    }

    return this.toggleModal();
  }

  toggleModal = () => {
    this.setState(state => ({ showModalBox: !state.showModalBox }));
  }

  render() {
    const {
      event,
      date,
      dateDay,
      noPhotoUrl,
      interestedTitle,
      nonRegistredTitle,
    } = this.props;
    const {
      title: { rendered: eventTitle },
      acf: {
        picture,
        picture_url: pictureUrl,
        price: eventPrice = '',
        currency: eventCurrency = '',
        cities: eventCity,
        location: eventLocation,
        time: eventTime,
        tags: eventTags,
      },
    } = event;
    const { isAuthorized, isSubscribed, showModalBox } = this.state;
    const eventImgUrl = picture || pictureUrl || noPhotoUrl;

    return (
      <div className="row area-1">
        <EventDetailView
          eventImgUrl={eventImgUrl}
          eventTitle={eventTitle}
          eventPrice={eventPrice}
          eventCurrency={eventCurrency}
          eventDay={date[0]}
          eventMonth={date[1]}
          eventTime={eventTime}
          eventDateDayCyrillic={dateDay}
          eventTags={eventTags}
          eventCity={eventCity}
          eventLocation={eventLocation}
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

EventDetail.defaultProps = {
  noPhotoUrl: imageUrlRecources.noPhoto,
  interestedTitle: globalRecources.interestedTitle,
  nonRegistredTitle: globalRecources.nonRegistred,
};

function mapStateToProps(store) {
  return { userProfile: store.user.data };
}

function mapDispatchToProps(dispatch) {
  return { fetchProfileData: (bodyParam, userID) => dispatch(fetchProfileData(bodyParam, userID)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
