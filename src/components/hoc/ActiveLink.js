import React from 'react';
import { NavLink } from 'react-router-dom';

const ActiveLink = props => <NavLink exact isActive={(_, { pathname }) => pathname.includes(props.to)} activeClassName="active" {...props} />;

export default ActiveLink;
