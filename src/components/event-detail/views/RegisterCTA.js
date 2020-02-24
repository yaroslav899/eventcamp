import React, { Fragment } from 'react';
import { withTranslation } from 'react-multi-lang';

const RegisterCTA = ({ register, t, ...props }) => {
  if (!register) {
    return <Fragment />;
  }

  return (
    <a href={register.replace(/\/\D+\/goto\?url\=/gi, '').replace('%3A', ':')} {...props}>
      {t('pdp.button.register')}
    </a>
  );
};
export default withTranslation(RegisterCTA);
