import React from 'react';
import { NavLink } from 'react-router-dom';

const Button = ({ text, ...props }) => (
  <NavLink {...props}>
    {text}
  </NavLink>
);

export default Button;
