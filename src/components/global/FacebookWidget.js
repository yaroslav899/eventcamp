import React, { PureComponent } from 'react';

class FacebookWidget extends PureComponent {
  componentDidMount() {
    // ToDo update this approach
    new Promise(() => {
      document.addEventListener('fb_init', e => FB && FB.XFBML.parse());
      window.fbAsyncInit = function () {
        FB && FB.init({
          appId: '652873901800006',
          xfbml: false,
          version: 'v2.6'
        });
      };
    }).then(() => {
      document.dispatchEvent(new Event('fb_init'));
    }).then(() => {
      window.fbAsyncInit && FB && window.fbAsyncInit();
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
