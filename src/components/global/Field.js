import React from 'react';

const Field = ({ label = '', text = '' }) => (
  <p>
    {label}
    <br />
    <b>{text}</b>
  </p>
);

export default Field;
