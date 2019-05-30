import React from 'react';
import { NavLink } from 'react-router-dom';
import { categories } from '../../fixtures';

const ServicePicture = () => {
  return categories.map(category => <div key={category.id} className="col-6 col-sm-4 text-center">
    <NavLink to={`/events/any/${category.url}`}>
      <img src={category.img} alt={category.name} title={category.name} className="img-fluid" />
      <br />
      <p>{category.name}</p>
    </NavLink>
  </div>);
};

export default ServicePicture;
