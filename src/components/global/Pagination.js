import React from 'react';

const Pagination = ({ pageNumber, classNameItem, classNameLink, handler }) => (
  <li key={pageNumber} className={classNameItem}>
    <a className={classNameLink} onClick={handler}>{pageNumber}</a>
  </li>
);
export default Pagination;
