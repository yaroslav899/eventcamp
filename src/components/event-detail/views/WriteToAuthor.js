import React from 'react';
import { withTranslation } from 'react-multi-lang';

const WriteToAuthor = ({ t, ...props }) => (
  <a {...props}>
    {t('pdp.button.writeToAuthor')}
  </a>
);

export default withTranslation(WriteToAuthor);
