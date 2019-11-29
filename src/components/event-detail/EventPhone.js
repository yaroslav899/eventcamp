import React, { PureComponent, Fragment } from 'react';
import { detailRecources } from '../../resources';

class EventPhone extends PureComponent {
  state = {
    phoneNumber: detailRecources.showPhone,
    isPhoneUpdated: false,
  }

  handlePhoneClick = () => {
    const { isPhoneUpdated } = this.state;
    const { phone = null } = this.props;

    if (isPhoneUpdated || !phone) {
      return false;
    }

    this.setState({
      phoneNumber: phone,
      isPhoneUpdated: true,
    });

    return true;
  }

  render() {
    const { phone = null } = this.props;
    const { phoneNumber } = this.state;

    if (!phone) return <Fragment />;

    return (
      <span role="textbox" tabIndex="0" className="feedback-phone" onClick={this.handlePhoneClick}>
        {phoneNumber}
      </span>
    );
  }
}

export default EventPhone;
