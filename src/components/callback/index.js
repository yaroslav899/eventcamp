import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CallBackForm from './CallBackForm';
import store from '../../store';
import { request } from '../../api';
import { getValueFromParams, createMarkupText } from '../../helper';
import Adventages from '../global/Adventages';
import { mainMenu } from '../../resources/menu';
import { titleList } from '../../resources/global';

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

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { text } = this.props;

    return (
      <div className="container">
        <Adventages />
        <div className="row">
          <div className="col-12">
            <h1>{titleList.callback}</h1>
            <div className="row">
              <div className="col-6">
                <CallBackForm />
              </div>
              <div className="col-6">
                <span dangerouslySetInnerHTML={createMarkupText(text)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeData => {
  return { text: storeData.page.callback };
};

export default connect(mapStateToProps)(CallBack);
