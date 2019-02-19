import React, { PureComponent } from 'react';
import { request } from '../api';
import { mainMenu } from '../resources';
import { getValueFromParams } from '../helper';

class MainText extends PureComponent {
  state = {
    text: '',
  };

  componentDidMount() {
    const mainPageID = getValueFromParams(mainMenu, '/', 'url', 'id');

    request.getPage(mainPageID).then((data) => {
      if (data) {
        localStorage.setItem('','')
        this.setState({ text: data.content.rendered });
      }
    });
  }

  render() {
    const {
      state: {
        text,
      },
    } = this;

    function createMarkupText() {
      return { __html: text };
    }

    return (
      <div className="additional-area d-none d-sm-block">
        <div className="container">
          <div className="row">
            <div className="col-12 column" dangerouslySetInnerHTML={createMarkupText()} />
          </div>
        </div>
      </div>
    );
  }
}

export default MainText;
