import React from 'react';

const Field = ({ label = '', text = '', className = '' }) => (
  <p className={className}>
    {label}
    <br />
    <b>{text}</b>
  </p>
);

export default Field;
