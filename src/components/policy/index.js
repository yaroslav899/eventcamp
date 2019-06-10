import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { request } from '../../api';
import { getValueFromParams, createMarkupText } from '../../helper';
import Adventages from '../global/Adventages';
import { mainMenu } from '../../resources/menu';

class Policy extends PureComponent {
  state = {
    text: '',
  }

  componentDidMount() {
    const {
      text,
      location: { pathname },
    } = this.props;

    if (text) {
      return false;
    }

    const policyPageID = 750;

    return request.getPage(policyPageID).then((data) => {
      if (!data) {
        return false;
      }

      this.setState({ text: data.content.rendered });

      return true;
    });
  }

  render() {
    const { text } = this.state;

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

export default connect(mapStateToProps)(Policy);
