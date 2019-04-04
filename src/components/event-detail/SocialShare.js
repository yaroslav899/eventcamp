import React, { Component } from 'react';
import { globalRecources } from '../../resources';

export default class SocialShare extends Component {
  render(){
  	const { data } = this.props;
    if (!data) {
    	return <div>{globalRecources.loading}</div>;
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
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    const twitterUrl = `https://twitter.com/intent/tweet/?url=${url}`;
    const pinterestUrl = `https://www.pinterest.com/pin/create/button/?url=${url}`;
    const emailUrl = `mailto:${email}?subject=${rendered}&;body=${url}`;

    return (
      <div className="socialShare">
	      <a title="Share on Facebook" data-share="facebook" href={facebookUrl} target="_blank">
	      	<img src="/img/facebook.png" alt="facebook" />
	      </a>
	      <a title="Share on Twitter" data-share="twitter" href={twitterUrl} target="_blank">
	      	<img src="/img/twitter.png" alt="twitter" />
	      </a>
	      <a title="Share on Linkedin" data-share="linkedin" href={twitterUrl} target="_blank">
      	  <img src="/img/in.png" alt="linkedin" />
  	    </a>
	      <a title="Share on Pinterest" data-share="pinterest" href={pinterestUrl} data-pin-do="buttonPin" data-pin-custom="true">
	      	<img src="/img/pinterest.png" alt="pinterest" />
	      </a>
	      <a title="Share by Email" data-share="email" href={emailUrl}>
	      	<img src="/img/email.png" alt="email" />
	      </a>
      </div>
    )
  }
}