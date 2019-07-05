import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { categories, cities } from '../../fixtures';
import { meta } from '../../resources/meta/plp';
import { getValueFromParams } from '../../helper';

class Meta extends Component {
  render() {
    const { category, city, metalang, metaimage } = this.props;
    const cityValue = city ? getValueFromParams(cities, city, 'id', 'name') : null;
    const categoryValue = category ? getValueFromParams(categories, category, 'id', 'name') : null;
    const updatedTitle = this._getTitle(cityValue, categoryValue);
    const updatedKeywords = this._getKeywords(cityValue, categoryValue);
    const updatedDescription = this._getDescription(cityValue, categoryValue);

    return (
      <Fragment>
        <Helmet>
          <title itemProp="name" lang={metalang}>{`${updatedTitle} - EventCamp`}</title>
          <meta name="description" content={updatedDescription} />
          <meta name="keywords" content={updatedKeywords} />
          <meta property="og:title" content={`${updatedTitle} - EventCamp`} />
          <meta property="og:description" content={updatedDescription} />
          <meta property="og:image" content={metaimage} />
          <link rel="image_src" href={metaimage} />
        </Helmet>
        <h1>
          {updatedTitle}
        </h1>
      </Fragment>
    );
  }

  _getTitle(cityValue, categoryValue) {
    const { title, additionalTitle } = this.props;
    let updatedTitle = cityValue ? `${title} ${additionalTitle} ${cityValue}` : title;

    updatedTitle = categoryValue ? `${categoryValue}. ${updatedTitle}` : updatedTitle;

    return updatedTitle;
  }

  _getKeywords(cityValue, categoryValue) {
    const { keywords } = this.props;
    let updatedKeywords = keywords.split(',');
    updatedKeywords = updatedKeywords.map(keyword => {
      keyword = cityValue ? keyword + ' ' + cityValue : keyword;
      keyword = categoryValue ? keyword + ' ' + categoryValue : keyword;

      return keyword;
    });

    return updatedKeywords.join(',');
  }

  _getDescription(cityValue, categoryValue) {
    const { description } = this.props;

    return description;
  }
}

const mapStateToProps = storeData => {
  return {
    category: storeData.filterState.categories,
    city: storeData.filterState.cities,
  };
};

Meta.defaultProps = {
  title: meta.title,
  additionalTitle: meta.additionalTitle,
  keywords: meta.keywords,
  description: meta.description,
  metalang: meta.lang,
  metaimage: meta.image,
};

export default connect(mapStateToProps)(Meta);
