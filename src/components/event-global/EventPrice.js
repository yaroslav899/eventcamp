import React from 'react';
import { free } from '../../fixtures';
import { globalRecources } from '../../resources/global';

const EventPrice = ({ className = '', price = '', currency = '' }) => (
  <div className={className} itemProp="price" content={price.replace(/₴/gi, '')}>
    {!free.includes(price) ? (price.replace(/₴/gi, '') + ' ' + currency || '') : globalRecources.free}
  </div>
);

export default EventPrice;
