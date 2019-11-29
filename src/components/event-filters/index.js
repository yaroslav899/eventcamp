import React, { Fragment } from 'react';
import DateRange from './DateRange';
import FilterView from './views/FilterView';

const Filters = () => (
  <Fragment>
    <DateRange />
    <FilterView />
  </Fragment>
);

export default Filters;
