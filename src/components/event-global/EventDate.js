import React from 'react';
import moment from 'moment';

const EventDate = ({ className, date = null }) => {
  return (
    <div className={className}>
      {date ? moment(date, 'YYYY-MM-DD').format('DD MMM YYYY') : ''}
    </div>
  );
};

export default EventDate;
