import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { request } from '../api';
import { getValueFromParams, createMarkupText } from '../helper';
import { mainMenu } from '../resources/menu';

class MainText extends PureComponent {
  componentDidMount() {
    const { text } = this.props;

    if (text) {
      return null;
    }

    const mainPageID = getValueFromParams(mainMenu, '/', 'url', 'id');

    request.getPage(mainPageID).then((data) => {
      if (!data) {
        return null;
      }

      store.dispatch({
        type: 'UPDATE_MAIN_PAGE',
        main: data.content.rendered,
      });
    });
  }

  render() {
    const { text } = this.props;

    return (
      <div className="additional-area d-none d-sm-block">
        <div className="container">
          <div className="row">
            <div className="col-12 column" dangerouslySetInnerHTML={createMarkupText(text)} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function (store) {
  return {
    text: store.page.main,
  };
};

export default connect(mapStateToProps)(MainText);
