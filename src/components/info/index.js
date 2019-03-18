import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { request } from '../../api';
import { mainMenu } from '../../resources';
import { getValueFromParams } from '../../helper';
import Adventages from '../global/Adventages';

class InfoPage extends PureComponent {
  componentDidMount() {
    const {
      text,
      location: {
        pathname,
      }
    } = this.props;

    if (text) {
      return null;
    }

    const infoPageID = getValueFromParams(mainMenu, pathname, 'url', 'id');

    request.getPage(infoPageID).then((data) => {
      if (!data) {
        return null;
      }

      store.dispatch({
        type: 'UPDATE_INFO_PAGE',
        info: data.content.rendered,
      });
    });
  }

  createMarkupText() {
    const { text } = this.props;
    return { __html: text };
  }

  render() {
    return (
      <div className="container">
        <Adventages/>
          <div className="row">
            <div className="col-12" dangerouslySetInnerHTML={this.createMarkupText()} />
          </div>
        </div>
    );
  }
}

const mapStateToProps = function (store) {
  return {
    text: store.page.info,
  };
};

export default connect(mapStateToProps)(InfoPage);