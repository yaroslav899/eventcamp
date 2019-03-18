import React from 'react';
import Adventages from '../../global/Adventages';
import Title from '../Title';
import Filters from '../../event-filters';
import LastPosts from '../../global/LastPosts';
import Pagination from '../PaginationContainter';
import '../../../css/listPage.css';

const ListPageView = ({ eventsElement }) => (
  <div className="container events">
    <Adventages />
    <div className="row">
      <div className="col-9">
        <Title />
        <ul className="events__list">
          {eventsElement}
        </ul>
      </div>
      <div className="col-3">
        <Filters />
        <LastPosts />
      </div>
    </div>
    <div className="row">
      <div className="col-12">
        <Pagination />
      </div>
    </div>
  </div>
);

export default ListPageView;