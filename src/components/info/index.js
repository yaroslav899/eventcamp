import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { request } from '../../api';
import { getValueFromParams, createMarkupText } from '../../helper';
import Adventages from '../global/Adventages';
import { mainMenu } from '../../resources/menu';

class InfoPage extends PureComponent {
  componentDidMount() {
    const {
      text,
      location: { pathname },
    } = this.props;

    if (text) {
      return false;
    }

    const infoPageID = getValueFromParams(mainMenu, pathname, 'url', 'id');

    return request.getPage(infoPageID).then((data) => {
      if (!data) {
        return false;
      }

      store.dispatch({
        type: 'UPDATE_INFO_PAGE',
        info: data.content.rendered,
      });

      return true;
    });
  }

  render() {
    const { text } = this.props;

    return (
      <div className="container">
        <Adventages />
        <div className="row">
          <div className="col-12" dangerouslySetInnerHTML={createMarkupText(text)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeData) => {
  return { text: storeData.page.info };
};

export default connect(mapStateToProps)(InfoPage);
