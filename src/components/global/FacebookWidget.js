import React, { PureComponent } from 'react';

class FacebookWidget extends PureComponent {
  componentDidMount() {
    window.FB && window.FB.XFBML.parse()
  }

  render() {
    return (
        <div
          className="fb-page"
          data-href="https://www.facebook.com/eventcampukraine/"
          data-tabs="timeline"
          data-width="270"
          data-height="200"
          data-small-header="true"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="true"
        >
          <blockquote cite="https://www.facebook.com/eventcampukraine/" className="fb-xfbml-parse-ignore">
            <a href="https://www.facebook.com/eventcampukraine/">Event camp - Події, конференції та зустрічі України</a>
          </blockquote>
        </div>
    );
  }
}

export default FacebookWidget;
