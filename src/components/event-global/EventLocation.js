import React, { Fragment } from 'react';

const EventLocation = (data) => {
  const { city, address } = data;

  return (
    <Fragment>
      {`${city}, ${address}`}
    </Fragment>
  );
}

export default EventLocation;
