import React from 'react';
import { globalRecources } from '../resources/global';

const NoMatch404 = ({ msg404 }) => (
  <div className="container">
    {msg404}
  </div>
);

NoMatch404.defaultProps = { msg404: globalRecources.error404 };

export default NoMatch404;
