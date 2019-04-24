import React, { PureComponent, Fragment } from 'react';
import { detailRecources } from '../../resources';

class FeedBackURL extends PureComponent {
  state = {
    phoneNumber: detailRecources.showPhone,
    isPhoneUpdated: false,
  }

  handlePhoneClick = (event) => {
    const { isPhoneUpdated } = this.state;

    if (isPhoneUpdated) {
      return true;
    }

    const { data } = this.props;
    const { phone = null } = data.acf;

    if (!phone || !phone.length) {
      return false;
    }

    this.setState({
      phoneNumber: phone,
      isPhoneUpdated: true,
    });
  }

  render() {
    const { data } = this.props;
    const { phoneNumber } = this.state;

    if (!data) return <Fragment />;

    const {
      acf: {
        email,
      },
      title: {
        rendered,
      },
    } = data;
    const url = location.href;
    const emailUrl = `mailto:${email}?subject=${rendered}&;body=${url}`;

    return (
      <div className="feedback-detail-right">
        <a href={emailUrl} target="_blank" className="write-organisator" title="">
          {detailRecources.writeAuthor}
        </a>
        {data.acf.register &&
          <a href={data.acf.register} target="_blank" className="feedback-registration" title="">
            {detailRecources.register}
          </a>
        }
        {data.acf.phone &&
          <a className="feedback-phone" onClick={this.handlePhoneClick}>
            {phoneNumber}
          </a>
        }
      </div>
    );
  }
}

export default FeedBackURL;
