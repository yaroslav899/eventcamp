import React, { PureComponent } from 'react';

class FacebookWidget extends PureComponent {
  componentDidMount() {
    // ToDo update this approach
    window.fbAsyncInit = function () {
      FB && FB.init({
          appId: '652873901800006',
          xfbml: false,
          version: 'v2.6'
      });
      document.dispatchEvent(new Event('fb_init'));
    };
    document.addEventListener('fb_init', e => FB && FB.XFBML.parse());
    window.fbAsyncInit && window.fbAsyncInit();
  }

  render() {
    return (
      <div
        className="fb-page"
        data-href="https://www.facebook.com/eventcampua/"
        data-width="270"
        data-hide-cover="false"
        data-show-facepile="false"
      >
        <blockquote
          cite="https://www.facebook.com/eventcampua/"
          className="fb-xfbml-parse-ignore"
        />
      </div>
    )
  }
}

export default FacebookWidget;
