import React from 'react';
import { cities } from '../../fixtures';

const EventLocation = ({ className = '', city = 'kiev', address = '' }) => {
  const cityValue = cities.find(item => item.url === city);

  return (
    <div className={className}>
      {`${cityValue ? cityValue.name : city}, ${address}`}
    </div>
  );
}

export default EventLocation;
