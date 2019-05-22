import React from 'react';

const Pagination = ({ pageNumber, classNameItem, handler }) => {
  let pageNumberCta = null;

  const onClick = (e) => {
    e.preventDefault();

    if (pageNumberCta.textContent) {
      handler(pageNumberCta.textContent);
    }
  };

  return (
    <li key={pageNumber} className={classNameItem}>
      <button onClick={onClick} type="button" ref={(button) => { pageNumberCta = button; }}>
        {pageNumber}
      </button>
    </li>
  );
};

export default Pagination;
