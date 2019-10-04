import React from 'react';
import CityField from './CityField';
import CategoryField from './CategoryField';
import TopicField from './TopicField';

const SelectFilter = () => {
  return (
    <div className="event-filter-option">
      <CityField changeHistory={true} />
      <CategoryField />
      <TopicField />
    </div>
  );
};

export default SelectFilter;
