import React from 'react';

const Pagination = ({ pageNumber, classNameItem, classNameLink, handler }) => (
  <li key={pageNumber} className={classNameItem}>
    <a onClick={handler}>{pageNumber}</a>
  </li>
);
export default Pagination;
