import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { categories, cities } from '../../fixtures';
import { listRecources } from '../../recources';
import { getValueFromParams } from '../../helper';

class Title extends Component {
  render() {
    let { title } = listRecources;
    const {
      category,
      city,
    } = this.props;
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

const mapStateToProps = function (store) {
  return {
    category: store.filterState.categories,
    city: store.filterState.cities,
  };
};

export default connect(mapStateToProps)(Title);
