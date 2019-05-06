import React, { Component, Fragment } from 'react';
import { imageUrlRecources, socialUrl } from '../../resources/url';

class SocialShare extends Component {
  render(){
    const { data } = this.props;

    if (!data) {
      return <Fragment />;
    }

    const {
      acf: {
        email,
      },
      title: {
        rendered,
      },
    } = data
    const url = location.href;
    const facebookUrl = `${imageUrlRecources.facebook}${url}`;
    const twitterUrl = `https://twitter.com/intent/tweet/?url=${url}`;
    const pinterestUrl = `https://www.pinterest.com/pin/create/button/?url=${url}`;
    const emailUrl = `mailto:${email}?subject=${rendered}&;body=${url}`;

    return (
      <div className="socialShare">
        <a title="Share on Facebook" data-share="facebook" href={socialUrl.facebookUrl} target="_blank">
          <img src={imageUrlRecources.facebook} alt="facebook" />
        </a>
        <a title="Share on Twitter" data-share="twitter" href={socialUrl.twitterUrl} target="_blank">
          <img src={imageUrlRecources.twitter} alt="twitter" />
        </a>
        <a title="Share on Linkedin" data-share="linkedin" href={socialUrl.twitterUrl} target="_blank">
          <img src={imageUrlRecources.linkedin} alt="linkedin" />
        </a>
        <a title="Share on Pinterest" data-share="pinterest" href={pinterestUrl} data-pin-do="buttonPin" data-pin-custom="true">
         <img src={imageUrlRecources.pinterest} alt="pinterest" />
        </a>
        <a title="Share by Email" data-share="email" href={emailUrl}>
          <img src={imageUrlRecources.email} alt="email" />
        </a>
      </div>
    )
  }
}

export default SocialShare;