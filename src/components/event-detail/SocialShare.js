import React, { PureComponent, Fragment } from 'react';
import { imageUrlRecources, socialUrl } from '../../resources/url';

class SocialShare extends PureComponent {
  render() {
    const { data } = this.props;

    if (!data) {
      return <Fragment />;
    }

    const {
      acf: { email },
      title: { rendered },
    } = data;
    const url = window.location.href;
    const facebookUrl = socialUrl.fb.replace('{url}', url);
    const twitterUrl = socialUrl.tw.replace('{url}', url);
    const pinterestUrl = socialUrl.pt.replace('{url}', url);
    const linkedinUrl = socialUrl.lin.replace('{url}', url);
    const emailUrl = `mailto:${email}?subject=${rendered}&;body=${url}`;

    return (
      <div className="socialShare">
        <a title="Share on Facebook" data-share="facebook" href={facebookUrl} target="_blank" rel="noopener noreferrer">
          <img src={imageUrlRecources.facebook} alt="facebook" />
        </a>
        <a title="Share on Twitter" data-share="twitter" href={twitterUrl} target="_blank" rel="noopener noreferrer">
          <img src={imageUrlRecources.twitter} alt="twitter" />
        </a>
        <a title="Share on Linkedin" data-share="linkedin" href={linkedinUrl} target="_blank" rel="noopener noreferrer">
          <img src={imageUrlRecources.linkedin} alt="linkedin" />
        </a>
        <a title="Share on Pinterest" data-share="pinterest" href={pinterestUrl} data-pin-do="buttonPin" data-pin-custom="true" target="_blank" rel="noopener noreferrer">
          <img src={imageUrlRecources.pinterest} alt="pinterest" />
        </a>
        <a title="Share by Email" data-share="email" href={emailUrl}>
          <img src={imageUrlRecources.email} alt="email" />
        </a>
      </div>
    );
  }
}

export default SocialShare;
