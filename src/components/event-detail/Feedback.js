import React, { Component } from 'react';
import { globalRecources, detailRecources } from '../../recources';

export default class FeedBackURL extends Component {
  render() {
    const { data } = this.props;
    if (!data) return <div>{globalRecources.loading}</div>;

    return (
      <div className="feedback-detail-right">
        <a href="" className="write-organisator" title="">{detailRecources.writeAuthor}</a>
        <br />
        <a href="" className="feedback-registration" title="">{detailRecources.register}</a>
      </div>
    );
  }
}
