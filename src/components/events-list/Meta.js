import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { categories, cities } from '../../fixtures';
import { meta } from '../../resources/meta/plp';
import { getValueFromParams } from '../../helper';

class Meta extends Component {
  _getTitle(cityValue, categoryValue) {
    const { title, additionalTitle } = this.props;
    let updatedTitle = title;

    updatedTitle = updatedTitle.replace('{0}', categoryValue || '');
    updatedTitle = updatedTitle.replace('{1}', cityValue ? ` ${additionalTitle} ${cityValue}` : '');

    return updatedTitle;
  }

  _getKeywords(cityValue, categoryValue) {
    const { keywords } = this.props;
    let updatedKeywords = keywords;

    updatedKeywords = updatedKeywords.replace(/\{0\}/gi, categoryValue ? ` ${categoryValue}` : '');
    updatedKeywords = updatedKeywords.replace(/\{1\}/gi, cityValue ? ` ${cityValue}` : '');

    return updatedKeywords;
  }

  _getDescription(cityValue, categoryValue) {
    const { description, eventTitle, additionalTitle } = this.props;
    let updatedDescription = description;

    updatedDescription = updatedDescription.replace('{0}', cityValue ? `${cityValue} ${eventTitle}: `: '');
    updatedDescription = updatedDescription.replace(/\{1\}/gi, categoryValue ? `${categoryValue}`: '');
    updatedDescription = updatedDescription.replace('{2}', cityValue ? ` ${additionalTitle} ${cityValue}`: '');

    return updatedDescription;
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

const mapStateToProps = store => {
  return {
    category: store.eventState.categories,
    city: store.eventState.cities,
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
