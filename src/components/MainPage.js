import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { withTranslation } from 'react-multi-lang';
import Adventages from './global/Adventages';
import ServicePicture from './global/ServicePicture';
import LastPosts from './global/LastPosts';
import DateRange from './event-filters/DateRange';
import CityField from './event-filters/CityField';
import Button from './global/Button';
import MainText from './MainText';
import { getHistoryUrl } from '../helper';
import { meta } from '../resources/meta/hp';

class MainPage extends PureComponent {
  render() {
    const {
      title,
      description,
      keywords,
      metaurl,
      metaimg,
      metalang,
      h2,
      cities = '',
      t,
    } = this.props;

    return (
      <section>
        <Helmet>
          <title itemProp="name" lang={metalang}>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={metaurl} />
          <meta property="og:image" content={metaimg} />
          <link rel="image_src" href={metaimg} />
          <link rel="alternate" hrefLang={metalang} href={metaurl} />
          <link rel="alternate" hrefLang="x-default" href={metaurl} />
          <link rel="canonical" href={metaurl} />
        </Helmet>
        <div className="container home-page">
          <Adventages />
          <div className="row">
            <div className="col-12 col-sm-9 category-main">
              <div className="row d-none d-md-block">
                <h2>{h2}</h2>
              </div>
              <div className="row">
                <ServicePicture />
              </div>
            </div>
            <div className="col-12 col-md-3 events_filter-wrapper">
              <CityField changeHistory={false} />
              <DateRange />
              <Button text={t('global.button.show')} className="events-item-action__button" to={getHistoryUrl('cities', { value: cities }, '')} />
              <LastPosts />
            </div>
          </div>
        </div>
        <MainText />
      </section>
    );
  }
}

MainPage.defaultProps = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  metaurl: meta.url,
  metaimg: meta.img,
  metalang: meta.lang,
  h2: meta.h2,
};

function mapStateToProps(store) {
  return { cities: store.eventState.cities };
}

export default withTranslation(connect(mapStateToProps)(MainPage));
