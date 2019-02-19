import React, { Component } from 'react';
import { globalRecources } from '../../resources';

export default class SocialShare extends Component {
  render(){
    if (!this.props.data) return <div>{globalRecources.loading}</div>;

    return (
      <div className="socialShare">
          <div className="addthis_inline_share_toolbox"></div>
          <div className="clear"></div>
      </div>
    )
  }
}