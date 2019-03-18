import React, { PureComponent } from 'react';
import { globalRecources, detailRecources } from '../../resources';

export default class FeedBackURL extends PureComponent {
  render() {
    const { data } = this.props;

    if (!data) return <div>{globalRecources.loading}</div>;

    return (
      <div className="feedback-detail-right">
        <a href="" className="write-organisator" title="">{detailRecources.writeAuthor}</a>
        <br />
        {data.acf.register &&
          <a href={data.acf.register} className="feedback-registration" title="">{detailRecources.register}</a>
        }
      </div>
    );
  }
}
