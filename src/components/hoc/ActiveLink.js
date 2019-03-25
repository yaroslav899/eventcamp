import React from 'react';
import { NavLink } from 'react-router-dom';

const ActiveLink = (props) => <NavLink exact activeClassName="active" {...props} />;
export default ActiveLink;
