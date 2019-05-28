import React, { PureComponent } from 'react';

class FacebookWidget extends PureComponent {
  componentDidMount() {
    const { appId, xfbml, version } = this.props;
    // ToDo update this approach
    new Promise((resolve) => {
      window.fbAsyncInit = () => {
        window.FB && window.FB.init({
          appId,
          xfbml,
          version,
        });
      };
      resolve(true);
    }).then(() => {
      document.addEventListener('fb_init', () => window.FB && window.FB.XFBML.parse());
      return true;
    }).then(() => {
      document.dispatchEvent(new Event('fb_init'));
      return true;
    }).then(() => {
      window.fbAsyncInit && window.FB && window.fbAsyncInit();
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
    );
  }
}

FacebookWidget.defaultProps = {
  appId: '652873901800006',
  xfbml: false,
  version: 'v2.6',
};

export default FacebookWidget;
