import React, { PureComponent } from 'react';
import { request } from '../../api';
import { mainMenu } from '../../resources';
import { getValueFromParams } from '../../helper';
import Adventages from '../global/Adventages';

class InfoPage extends PureComponent {
  state = {
    text: '',
  };

  componentDidMount() {
    const mainPageID = getValueFromParams(mainMenu, this.props.location.pathname, 'url', 'id');
    request.getPage(mainPageID).then((data) => {
      data && this.setState({ text: data.content.rendered })
    });
  }

  render() {
    return (
      <div className="container">
        <Adventages/>
          <div className="row">
          <div className="col-12" dangerouslySetInnerHTML={{ __html: this.state.text }} />
          </div>
        </div>
    );
  }
}

export default InfoPage;