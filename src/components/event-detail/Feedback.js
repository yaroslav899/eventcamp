import React, { PureComponent, Fragment } from 'react';
import { globalRecources, detailRecources } from '../../resources';

class FeedBackURL extends PureComponent {
  state = {
    phoneNumber: '',
  }

  handlePhoneClick = (event) => {
    event.target.innerText = this.state.phoneNumber;
  }

  render() {
    const { data } = this.props;

    if (!data) return <Fragment />;

    this.setState({
      phoneNumber: data.acf.phone,
    });

    return (
      <div className="feedback-detail-right">
        <a href="" className="write-organisator" title="">{detailRecources.writeAuthor}</a>
        <br />
        {data.acf.register &&
          <a href={data.acf.register} className="feedback-registration" title="">{detailRecources.register}</a>
        }
        <br />
        {data.acf.phone &&
          <div onClick={this.handlePhoneClick}>Показать телефон</div>
        }
      </div>
    );
  }
}

export default FeedBackURL;
