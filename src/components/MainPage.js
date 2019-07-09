import React from 'react';
import { Helmet } from 'react-helmet';
import Banner from './global/Banner';
import Adventages from './global/Adventages';
import ServicePicture from './global/ServicePicture';
import LastPosts from './global/LastPosts';
import MainText from './MainText';
import { meta } from '../resources/meta/hp';

const MainPage = ({ title, description, keywords, metaurl, metaimg, metalang }) => (
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
    <div className="d-none d-md-block">
      <Banner />
    </div>
    <div className="container">
      <Adventages />
      <div className="row">
        <div className="col-12 col-sm-9 category-main">
          <div className="row">
            <ServicePicture />
          </div>
        </div>
        <div className="col-12 col-md-3">
          <LastPosts />
        </div>
      </div>
    </div>
    <MainText />
  </section>
);

MainPage.defaultProps = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  metaurl: meta.url,
  metaimg: meta.img,
  metalang: meta.lang,
};

export default MainPage;
