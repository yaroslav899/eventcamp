import React, { Fragment } from 'react';
import moment from 'moment';

const EventDate = (data) => {
  const { date } = data;

  return (
    <Fragment>
      {date ? moment(date, 'YYYY-MM-DD').format('DD MMM YYYY') : ''}
    </Fragment>
  );
}

export default EventDate;
