import React, { PureComponent } from 'react';

class FacebookWidget extends PureComponent {
  componentDidMount() {
    // ToDo update this approach
    new Promise((resolve) => {
      window.fbAsyncInit = function () {
        FB && FB.init({
          appId: '652873901800006',
          xfbml: false,
          version: 'v2.6'
        });
      };
      resolve(true);
    }).then(() => {
      document.addEventListener('fb_init', e => FB && FB.XFBML.parse());
      return true;
    }).then(() => {
      document.dispatchEvent(new Event('fb_init'));
      return true;
    }).then(() => {
      window.fbAsyncInit && FB && window.fbAsyncInit();
      return true;
    });
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
