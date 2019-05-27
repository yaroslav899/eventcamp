import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { request } from '../../api';
import { getValueFromParams, createMarkupText } from '../../helper';
import Adventages from '../global/Adventages';
import { mainMenu } from '../../resources/menu';

class CallBack extends PureComponent {
  componentDidMount() {
    const {
      text,
      location: { pathname },
    } = this.props;

    if (text) {
      return false;
    }

    const pageID = getValueFromParams(mainMenu, pathname, 'url', 'id');

    return request.getPage(pageID).then((data) => {
      if (!data) {
        return false;
      }

      store.dispatch({
        type: 'UPDATE_CALLBACK_PAGE',
        callback: data.content.rendered,
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

const mapStateToProps = storeData => {
  return { text: storeData.page.callback };
};

export default connect(mapStateToProps)(CallBack);
