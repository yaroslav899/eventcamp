import React from 'react';
import { NavLink } from 'react-router-dom';
import { categories } from '../../fixtures';

const ServicePicture = () => {
  return categories.map(category => <div key={category.id} className="col-6 col-sm-4">
    <NavLink to={`/events/any/${category.url}`}>
      <img src={category.img} alt={category.name} title={category.name} className="img-fluid" />
    </NavLink>
  </div>);
};

export default ServicePicture;
