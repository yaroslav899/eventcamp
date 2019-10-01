import React, { Fragment } from 'react';
import { detailRecources } from '../../resources';

const AddToInteresting = ({ register, target, className, title, registerButton }) => {
  if (!register) {
    return <Fragment />;
  }

  return (
    <a href={register.replace(/\/\D+\/goto\?url\=/gi, '').replace('%3A', ':')} target={target} className={className} title={title}>
      {registerButton}
    </a>
  );
};

AddToInteresting.defaultProps = { registerButton: detailRecources.register };

export default AddToInteresting;
