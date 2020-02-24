import React from 'react';
import { withTranslation } from 'react-multi-lang';
import { free } from '../../fixtures';

const EventPrice = ({ className = '', price = '', currency = '', t }) => (
  <div className={className}>
    {!free.includes(price) ? (price.replace(/₴/gi, '') + ' ' + currency || '') : t('global.free')}
  </div>
);

export default withTranslation(EventPrice);
