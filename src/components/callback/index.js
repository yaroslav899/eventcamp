import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import CallBackView from './views/CallBackView';
import Adventages from '../global/Adventages';
import { updateCallbackPage } from '../../redux/actions/pageActions';
import { request } from '../../api';
import { getValueFromParams, createMarkupText } from '../../helper';
import { mainMenu } from '../../resources/menu';
import { meta } from '../../resources/meta/callback';

class CallBack extends PureComponent {
  componentDidMount() {
    const { text } = this.props;

    if (text) {
      return false;
    }

    const { location: { pathname }, updateCallbackPage } = this.props;
    const pageID = getValueFromParams(mainMenu, pathname, 'url', 'id');

    return request.getPage(pageID).then((data) => {
      if (!data) {
        return false;
      }

      const { content: { rendered: page } } = data;

      updateCallbackPage(page);

      return true;
    });
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const {
      text,
      h1,
      title,
      description,
      keywords,
      metaimg,
      metalang,
    } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title itemProp="name" lang={metalang}>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={metaimg} />
          <link rel="image_src" href={metaimg} />
        </Helmet>
        <div className="container">
          <Adventages />
          <CallBackView title={h1} content={createMarkupText(text)} />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = storeData => {
  return { text: storeData.page.callback };
};

const mapDispatchToProps = dispatch => {
  return { updateCallbackPage: page => dispatch(updateCallbackPage(page)) };
};

CallBack.defaultProps = {
  h1: meta.h1,
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  metaimg: meta.image,
  metalang: meta.lang,
};

export default connect(mapStateToProps, mapDispatchToProps)(CallBack);
