import React from 'react';
import { Helmet } from 'react-helmet';
import { meta } from '../../resources/meta/info';

const Meta = ({ title, description, keywords, metaimg, metalang }) => {
  return (
    <Helmet>
      <title itemProp="name" lang={metalang}>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaimg} />
      <link rel="image_src" href={metaimg} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  metaimg: meta.image,
  metalang: meta.lang,
};

export default Meta;
