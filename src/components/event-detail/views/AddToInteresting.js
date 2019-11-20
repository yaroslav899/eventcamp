import React, { Fragment } from 'react';
import { detailRecources } from '../../../resources';

const AddToInteresting = ({ register, registerButton, ...props }) => {
  if (!register) {
    return <Fragment />;
  }

  return (
    <a href={register.replace(/\/\D+\/goto\?url\=/gi, '').replace('%3A', ':')} {...props}>
      {registerButton}
    </a>
  );
};

AddToInteresting.defaultProps = { registerButton: detailRecources.register };

export default AddToInteresting;
