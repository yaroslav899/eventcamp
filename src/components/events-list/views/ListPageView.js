import React from 'react';
import Adventages from '../../global/Adventages';
import Meta from '../Meta';
import Filters from '../../event-filters';
import LastPosts from '../../global/LastPosts';
import SearchPhrase from '../../global/SearchPhrase';
import PaginationContainer from '../PaginationContainer';

const ListPageView = ({ eventsElement }) => (
  <div className="container">
    <Adventages />
    <div className="row">
      <div className="col-12 col-lg-9 col-md-8 events">
        <Meta />
        {eventsElement}
      </div>
      <div className="col-12 col-lg-3 col-md-4 events-filter">
        <SearchPhrase />
        <Filters />
        <div className="d-none d-md-block">
          <LastPosts />
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-12">
        <PaginationContainer />
      </div>
    </div>
  </div>
);

export default ListPageView;
