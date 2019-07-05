import React, { Fragment } from 'react';
import { detailRecources } from '../../resources';

const AddToInteresting = ({ register, target, className, title, registerButton }) => {
  if (!register) {
    return <Fragment />;
  }

  return (
    <a href={register} target={target} className={className} title={title}>
      {registerButton}
    </a>
  );
};

AddToInteresting.defaultProps = { registerButton: detailRecources.register };

export default AddToInteresting;
