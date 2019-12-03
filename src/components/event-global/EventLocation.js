import React from 'react';
import { cities } from '../../fixtures';
import { createMarkupText } from '../../helper';

const EventLocation = ({ className = '', city = 'kiev', address = '' }) => {
  const cityValue = cities.find(item => item.url === city);
  const location = `${cityValue ? cityValue.name : city}, ${address}`;

  return (
    <div className={className} dangerouslySetInnerHTML={createMarkupText(location)} />
  );
};

export default EventLocation;
