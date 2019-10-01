import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import CallBackForm from './CallBackForm';
import store from '../../store';
import { request } from '../../api';
import { getValueFromParams, createMarkupText } from '../../helper';
import Adventages from '../global/Adventages';
import { mainMenu } from '../../resources/menu';
import { meta } from '../../resources/meta/callback';

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
          <div className="row">
            <div className="col-12">
              <h1>{h1}</h1>
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
      </Fragment>
    );
  }
}

const mapStateToProps = storeData => {
  return { text: storeData.page.callback };
};

CallBack.defaultProps = {
  h1: meta.h1,
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  metaimg: meta.image,
  metalang: meta.lang,
};

export default connect(mapStateToProps)(CallBack);
