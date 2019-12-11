import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords, date, city, image }) => {
  const pageTitle = `${title} - ${date} | ${city}`;
  const pageDescription = description.replace(/<[^>]+>/g,'');

  return (
    <Helmet>
      <title itemProp="name" lang="uk">{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <link rel="image_src" href={image} />
    </Helmet>
  );
};

export default Meta;
