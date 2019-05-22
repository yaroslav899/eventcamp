import React, { Component } from 'react';
import { connect } from 'react-redux';
import { categories, cities } from '../../fixtures';
import { listRecources } from '../../resources';
import { getValueFromParams } from '../../helper';

class Title extends Component {
  render() {
    let { title } = listRecources;
    const { category, city } = this.props;
    title = city ? `${title} ${listRecources.additionalTitle} ${getValueFromParams(cities, city, 'id', 'name')}` : title;
    title = category ? `${getValueFromParams(categories, category, 'id', 'name')}. ${title}` : title;
    document.title = title;

    return (
      <h1>
        {title}
      </h1>
    );
  }
}

const mapStateToProps = storeData => {
  return {
    category: storeData.filterState.categories,
    city: storeData.filterState.cities,
  };
};

export default connect(mapStateToProps)(Title);
