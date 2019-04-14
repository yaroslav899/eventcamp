import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { categories } from '../../fixtures';

export default class ServicePicture extends PureComponent {
  render() {
    const categoriesEvent = categories.map(category => <div key={category.id} className="col-6 col-sm-4">
      <NavLink to={`/events/any/${category.url}`}>
        <img src={category.img} alt={category.name} title={category.name} className="img-fluid" />
      </NavLink>
    </div>);
    return categoriesEvent;
  }
}