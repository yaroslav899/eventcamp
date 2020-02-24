import React, { PureComponent, Fragment } from 'react';
import { withTranslation } from 'react-multi-lang';

class EventPhone extends PureComponent {
  state = {
    phoneNumber: '',
    isPhoneUpdated: false,
  }

  componentDidMount() {
    const { t } = this.props;
    this.setState({ phoneNumber: t('pdp.button.showPhone') });
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

export default withTranslation(EventPhone);
