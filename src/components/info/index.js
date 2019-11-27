import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { updateInfoPage } from '../../redux/actions/pageActions';
import { request } from '../../api';
import { getValueFromParams, createMarkupText } from '../../helper';
import Adventages from '../global/Adventages';
import { mainMenu } from '../../resources/menu';
import { meta } from '../../resources/meta/info';

class InfoPage extends PureComponent {
  componentDidMount() {
    const { text, location: { pathname } } = this.props;

    if (text) {
      return false;
    }

    const infoPageID = getValueFromParams(mainMenu, pathname, 'url', 'id');
    const { dispatch } = this.props;

    return request.getPage(infoPageID).then((data) => {
      if (!data) {
        return false;
      }

      dispatch(updateInfoPage(data.content.rendered));

      return true;
    });
  }

  render() {
    const { text, title, description, keywords, metaimg, metalang } = this.props;

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
            <div className="col-12" dangerouslySetInnerHTML={createMarkupText(text)} />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (storeData) => {
  return { text: storeData.page.info };
};

InfoPage.defaultProps = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  metaimg: meta.image,
  metalang: meta.lang,
};

export default connect(mapStateToProps)(InfoPage);
