import React, { Component } from 'react';
import CityField from './CityField';
import CategoryField from './CategoryField';
import TopicField from './TopicField';

class SelectFilter extends Component {
  render() {
    return (
      <div className="event-filter-option">
        <CityField changeHistory={true} />
        <CategoryField />
        <TopicField />
      </div>
    );
  }
}

export default SelectFilter;
