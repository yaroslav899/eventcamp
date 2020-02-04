import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import EventView from './views/EventView';
import Modal from '../global/Modal';
import GoogleCalendar from '../event-detail/GoogleCalendar';
import { fetchProfileData } from '../../api';
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
      <Fragment>
      <div className="row" itemScope itemType="http://schema.org/Event">
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
      </div>      
      {showModalBox
          && <Modal
            toggleModal={this.toggleModal}
            modalTitle={eventTitle}
            modalBody={isAuthorized ? interestedTitle : nonRegistredTitle}
            modalFooter={isAuthorized ? <GoogleCalendar data={event} /> : false}
          />
        }
      </Fragment>
    );
  }
}

EventList.defaultProps = {
  interestedTitle: globalRecources.interestedTitle,
  nonRegistredTitle: globalRecources.nonRegistred,
  noPhotoUrl: imageUrlRecources.noPhoto,
};

function mapStateToProps(store) {
  return { userProfile: store.user.data };
}

function mapDispatchToProps(dispatch) {
  return { fetchProfileData: (bodyParam, userID) => dispatch(fetchProfileData(bodyParam, userID)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
