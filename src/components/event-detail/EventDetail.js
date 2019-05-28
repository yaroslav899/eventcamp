import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Modal from '../global/Modal';
import GoogleCalendar from './GoogleCalendar';
import EventLocation from '../event-global/EventLocation';
import EventPrice from '../event-global/EventPrice';
import EventTags from '../event-global/EventTags';
import { request } from '../../api';
import store from '../../store';
import { setCookie } from '../../_cookie';
import { globalRecources } from '../../resources/global';
import { imageUrlRecources } from '../../resources/url';

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
      const { userProfile, event: { id: eventID } } = this.props;
      const { isSubscribed } = this.state;

      if (isSubscribed) {
        userProfile.subscribed = subscribed.replace(eventID, '');
      } else {
        userProfile.subscribed = subscribed.length ? `${subscribed},${eventID}` : `${eventID}`;
      }

      if (!isSubscribed) {
        this.toggleModal();
      }

      this.setState({ isSubscribed: !isSubscribed });

      const param = { description: JSON.stringify(userProfile) };

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
    }
    this.toggleModal();

    return true;
  }

  toggleModal = () => {
    this.setState(state => ({ showModalBox: !state.showModalBox }));
  }

  render() {
    const {
      event,
      date,
      dateDay,
      interestedTitle,
      nonRegistredTitle,
      interestedButton,
      noPhotoUrl,
    } = this.props;
    const { isAuthorized, isSubscribed, showModalBox } = this.state;
    const modalBody = isAuthorized ? interestedTitle : nonRegistredTitle;

    return (
      <div className="row area-1">
        <div className="col-12 col-md-6 area-1_image">
          <img src={event.acf.picture || noPhotoUrl} alt={event.title.rendered} className="detail-picture" />
        </div>
        <div className="col-12 col-md-6 area-1_text">
          <EventPrice className="text-right area-1_price" price={event.acf.price} currency={event.acf.currency} />
          <div className="area-1_info">
            <span className="day">{date[0]}</span>
            <span className="month">{date[1]}</span>
            <span className="time">{event.acf.time}</span>
            <p>{dateDay}</p>
            <EventTags className="area-1_tags" tags={event.acf.tags} />
            <EventLocation className="area-1_location" city={event.acf.cities} address={event.acf.location} />
            <p className="area-1_interesting">
              <span className={isSubscribed ? 'm-active' : ''} onClick={this.subscribe}>
                {interestedButton}
              </span>
            </p>
          </div>
        </div>
        {showModalBox
          && <Modal
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

EventDetail.defaultProps = {
  interestedTitle: globalRecources.interestedTitle,
  nonRegistredTitle: globalRecources.nonRegistred,
  interestedButton: globalRecources.interestingCTA,
  noPhotoUrl: imageUrlRecources.noPhoto,
};

const mapStateToProps = storeData => {
  return { userProfile: storeData.user.data };
};

export default connect(mapStateToProps)(EventDetail);
