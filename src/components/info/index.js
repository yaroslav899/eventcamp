import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { updateInfoPage } from '../../redux/actions/pageActions';
import { fetchPageData } from '../../api';
import { createMarkupText } from '../../helper';
import Adventages from '../global/Adventages';
import Meta from './Meta';

class InfoPage extends PureComponent {
  componentDidMount() {
    const { text, location: { pathname }, updateInfoPage } = this.props;

    if (text) {
      return false;
    }

    return fetchPageData(pathname)
      .then(text => updateInfoPage(text));
  }

  render() {
    const { text } = this.props;

    return (
      <Fragment>
        <Meta />
        <div className="container">
          <Adventages />
          <div className="row">
            <div className="col-12" dangerouslySetInnerHTML={createMarkupText(text)} />
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(store) {
  return { text: store.page.info };
}

function mapDispatchToProps(dispatch) {
  return { updateInfoPage: info => dispatch(updateInfoPage(info)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage);
