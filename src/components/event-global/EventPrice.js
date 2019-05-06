import React, { Fragment } from 'react';
import { free } from '../../fixtures';
import { globalRecources } from '../../resources/global';

const EventPrice = (data) => {
  const { price = null, currency = '' } = data;

  return (
    <Fragment>
      {!free.includes(price) ? (price + ' ' + currency || '') : globalRecources.free}
    </Fragment>
  );
}

export default EventPrice;
