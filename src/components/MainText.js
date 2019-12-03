import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { updateMainPage } from '../redux/actions/pageActions';
import { fetchPageData } from '../api';
import { createMarkupText } from '../helper';

class MainText extends PureComponent {
  componentDidMount() {
    const { text, updateMainPage } = this.props;

    if (text) {
      return null;
    }

    return fetchPageData('/')
      .then(text => updateMainPage(text));
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

function mapStateToProps(store) {
  return { text: store.page.main };
}

function mapDispatchToProps(dispatch) {
  return { updateMainPage: page => dispatch(updateMainPage(page)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainText);
