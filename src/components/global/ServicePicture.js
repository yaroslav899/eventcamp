import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { categories } from '../../fixtures';

export default class ServicePicture extends Component {
  render() {
    const categoriesEvent = categories.map(category => <div key={category.id} className="col-12 col-sm-4">
      <NavLink to={`/events/${category.url}`}>
        <img src={category.img} alt={category.name} title={category.name} className="img-fluid" />
      </NavLink>
    </div>);
    return categoriesEvent;
  }
}