import React, { Fragment } from 'react';
import { detailRecources } from '../../../resources';

const RegisterCTA = ({ register, registerButton, ...props }) => {
  if (!register) {
    return <Fragment />;
  }

  return (
    <a href={register.replace(/\/\D+\/goto\?url\=/gi, '').replace('%3A', ':')} {...props}>
      {registerButton}
    </a>
  );
};

RegisterCTA.defaultProps = { registerButton: detailRecources.register };

export default RegisterCTA;
