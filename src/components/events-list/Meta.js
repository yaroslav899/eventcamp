import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { categories, cities } from '../../fixtures';
import { meta } from '../../resources/meta/plp';
import { getValueFromParams } from '../../helper';

class Meta extends Component {
  _getTitle(cityValue, categoryValue) {
    const { title, additionalTitle } = this.props;
    let updatedTitle = cityValue ? `${title} ${additionalTitle} ${cityValue}` : title;

    updatedTitle = categoryValue ? `${categoryValue}. ${updatedTitle}` : updatedTitle;

    return updatedTitle;
  }

  _getKeywords(cityValue, categoryValue) {
    const { keywords } = this.props;
    let updatedKeywords = keywords.split(',');
    updatedKeywords = updatedKeywords.map((keyword) => {
      let updatedKeyword = cityValue ? keyword + ' ' + cityValue : keyword;
      updatedKeyword = categoryValue ? updatedKeyword + ' ' + categoryValue : updatedKeyword;

      return updatedKeyword;
    });

    return updatedKeywords.join(',');
  }

  _getDescription(cityValue, categoryValue) {
    const { description, eventTitle, additionalTitle } = this.props;
    let updatedDescription = description.split('.');

    if (cityValue) {
      updatedDescription[0] = cityValue + ' ' + eventTitle + ': ' + updatedDescription[0];
      updatedDescription[0] = updatedDescription[0] + additionalTitle + ' ' + cityValue;
    }
    return updatedDescription.join('.');
  }

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
  eventTitle: meta.eventTitle,
  keywords: meta.keywords,
  description: meta.description,
  metalang: meta.lang,
  metaimage: meta.image,
};

export default connect(mapStateToProps)(Meta);
