import React, { PureComponent } from 'react';
import Modal from '../global/Modal';
import GoogleCalendar from './GoogleCalendar';
import { request } from '../../api';
import store from '../../store';
import { free } from '../../fixtures';
import { getUniqueArray } from '../../helper';
import { globalRecources, imageUrlRecources } from '../../resources';

export default class EventDetail extends PureComponent {
  state = {
    showModalBox: false,
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
      request.updatePostCountMembers(event, userData, countmembers);
    } else {
      this.toggleModal();
    }
  }

  toggleModal = () => {
    this.setState(state => ({
      showModalBox: !state.showModalBox,
    }));
  }

  render() {
    const { event, date, dateDay } = this.props;
    const { isAuthorized } = this.state;
    const modalBody = isAuthorized ? globalRecources.interestedTitle : globalRecources.nonRegistred;

    return (
      <div className="row area-1">
        <div className="col-6 area-1_image">
          <img src={event.acf.picture || imageUrlRecources.noPhoto} alt={event.title.rendered} className="detail-picture" />
        </div>
        <div className="col-6 area-1_text">
          <div className="text-right area-1_price">
            {!free.includes(event.acf.price) ? (event.acf.price + ' ' + event.acf.currency || '') : globalRecources.free}
          </div>
          <div className="area-1_info">
            <span className="day">{date[0]}</span>
            <span className="month">{date[1]}</span>
            <span className="time">{event.acf.time}</span>
            <p>{dateDay}</p>
            <p className="area-1_tags">
              {event.acf.tags ? getUniqueArray(event.acf.tags.split(',')).map((tag) => <span key={tag}>{tag}</span>) : ''}
            </p>
            <p className="area-1_location">
              {event.acf.cities}, {event.acf.location}
            </p>
            <p className="area-1_interesting">
              <span className={this.state.isSubscribed ? 'm-active' : ''} onClick={this.handleGoToClick}>
                {globalRecources.interestingCTA}
              </span>
            </p>
          </div>
        </div>
        {this.state.showModalBox &&
          <Modal
            toggleModal={this.toggleModal}
            title={event.title.rendered}
            body={modalBody}
            footer={this.state.isAuthorized ? <GoogleCalendar data={event} /> : ''}
          />
        }
      </div>
    )
  }
}