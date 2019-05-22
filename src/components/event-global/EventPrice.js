import React from 'react';
import { free } from '../../fixtures';
import { globalRecources } from '../../resources/global';

const EventPrice = ({ className = '', price = '', currency = '' }) => (
  <div className={className}>
    {!free.includes(price) ? (price + ' ' + currency || '') : globalRecources.free}
  </div>
);

export default EventPrice;
