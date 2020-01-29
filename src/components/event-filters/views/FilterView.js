import React, { Fragment } from 'react';
import CityField from '../CityField';
import CategoryField from '../CategoryField';
import TopicField from '../TopicField';

const FilterView = () => {
  return (
    <Fragment>
      <CityField changeHistory={true} />
      <CategoryField />
      <TopicField />
    </Fragment>
  );
};

export default FilterView;
