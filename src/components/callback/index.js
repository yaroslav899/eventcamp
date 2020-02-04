import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import CallBackView from './views/CallBackView';
import Adventages from '../global/Adventages';
import Meta from './Meta';
import { fetchPageData } from '../../api';
import { updateCallbackPage } from '../../redux/actions/pageActions';

class CallBack extends PureComponent {
  componentDidMount() {
    const { text, location: { pathname }, updateCallbackPage } = this.props;
    const pageID = 748;

    if (text) {
      return false;
    }

    return fetchPageData(pathname, pageID)
      .then(text => updateCallbackPage(text));
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { text } = this.props;

    return (
      <Fragment>
        <Meta/>
        <div className="container">
          <Adventages />
          <CallBackView content={text} />
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(store) {
  return { text: store.page.callback };
}

function mapDispatchToProps(dispatch) {
  return { updateCallbackPage: page => dispatch(updateCallbackPage(page)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(CallBack);
