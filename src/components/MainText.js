import React, { PureComponent } from 'react';
import { request } from '../api';
import { mainMenu } from '../recources';
import { getValueFromParams } from '../helper';


class MainText extends PureComponent {
  state = {
    text: '',
  };

  componentDidMount() {
    const mainPageID = getValueFromParams(mainMenu, '/', 'url', 'id');
    request.getPage(mainPageID).then((data) => {
      data && this.setState({ text: data.content.rendered })
    });
  }

  render() {
    return (
      <div className="additional-area d-none d-sm-block">
        <div className="container">
          <div className="row">
            <div className="col-12 column" dangerouslySetInnerHTML={{ __html: this.state.text }} />
          </div>
        </div>
      </div>
    );
  }
}

export default MainText;