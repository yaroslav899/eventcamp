import React from 'react';
import { NavLink } from 'react-router-dom';
import { globalRecources } from '../../resources/global';

const EventMoreCTA = (props) => (
  <NavLink {...props}>
    {globalRecources.moreInfo}
  </NavLink>
)

export default EventMoreCTA;
