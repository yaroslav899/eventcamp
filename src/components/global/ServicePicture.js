import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LastPosts from '../global/LastPosts';
import { categories } from '../../fixtures';

export default class ServicePicture extends Component {
  render() {
    let categoriesEvent = categories.map(category => <div key={category.id} className="col-12 col-sm-4">
      <NavLink to={`/events/${category.url}`}>
        <img src={category.img} alt={category.name} title={category.name} className="img-fluid" />
      </NavLink>
    </div>);
    return (
      <div className="row">
        <div className="col-12 col-sm-9 category-main">
          <div className="container">
            <div className="row">
              {categoriesEvent}
            </div>
          </div>
        </div>
        <div className="col-3">
          <LastPosts />
        </div>
      </div>
    )
  }
}