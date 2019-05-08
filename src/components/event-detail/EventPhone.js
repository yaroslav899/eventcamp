import React, { PureComponent, Fragment } from 'react';
import { detailRecources } from '../../resources';

class EventPhone extends PureComponent {
  state = {
    phoneNumber: detailRecources.showPhone,
    isPhoneUpdated: false,
  }

  handlePhoneClick = (event) => {
    const { isPhoneUpdated } = this.state;

    if (isPhoneUpdated) {
      return true;
    }

    const { phone } = this.props;

    if (!phone || !phone.length) {
      return false;
    }

    this.setState({
      phoneNumber: phone,
      isPhoneUpdated: true,
    });
  }

  render() {
    const { phone } = this.props;
    const { phoneNumber } = this.state;

    if (!phone) return <Fragment />;

    return (
      <a className="feedback-phone" onClick={this.handlePhoneClick}>
        {phoneNumber}
      </a>
    )
  }
}

export default EventPhone;
