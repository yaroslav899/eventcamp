import React, { Fragment } from 'react';
import DateRange from './DateRange';
import FilterView from './views/FilterView';

const Filters = () => (
  <Fragment>
    <FilterView />
    <DateRange />
  </Fragment>
);

export default Filters;
