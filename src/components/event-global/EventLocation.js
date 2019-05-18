import React from 'react';

const EventLocation = ({ className = '', city = '', address = '' }) => (
  <div className={className}>
    {`${city}, ${address}`}
  </div>
);

export default EventLocation;
