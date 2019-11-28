import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { updateMainPage } from '../redux/actions/pageActions';
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

    return request.getPage(mainPageID).then((data) => {
      if (!data) {
        return null;
      }

      const { updateMainPage } = this.props;

      updateMainPage(data.content.rendered);

      return true;
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

const mapStateToProps = (storeData) => {
  return { text: storeData.page.main };
};

const mapDispatchToProps = dispatch => {
  return { updateMainPage: main => dispatch(updateMainPage(main)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainText);
