import React from 'react';
import { cities } from '../../fixtures';
import { createMarkupText } from '../../helper';

const EventLocation = ({ className = '', city = 'kiev', address = '' }) => {
  const cityValue = cities.find(item => item.url === city);
  const location = `${cityValue ? cityValue.name : city}, ${address}`;

  return (
    <div className={className} itemProp="location" itemScope itemType="http://schema.org/Place">
      <span itemProp="address" content={location} dangerouslySetInnerHTML={createMarkupText(location)} />
    </div>
  );
};

export default EventLocation;
