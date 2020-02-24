import React from 'react';
import { withTranslation } from 'react-multi-lang';

const NoMatch404 = ({ t }) => (
  <div className="container">
    {t('global.error404')}
  </div>
);

export default withTranslation(NoMatch404);
