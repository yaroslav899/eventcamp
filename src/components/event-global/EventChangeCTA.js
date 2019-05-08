import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { globalRecources } from '../../resources/global';

const EventChangeCTA = (props) => {
  const { url, isOwner } = props;

  if (!isOwner) {
    return <Fragment />
  }

  return (
    <NavLink to={url}>
      {globalRecources.change}
    </NavLink>
  );
}

export default EventChangeCTA;
