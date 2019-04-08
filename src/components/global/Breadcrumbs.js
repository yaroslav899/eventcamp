import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';

export default class Breadcrumbs extends PureComponent {
  render() {
    return(
      <div>
        <NavLink to='/'>Главная</NavLink>
        &nbsp;>&nbsp;
        <span>{document.title}</span>
      </div>
    )
  }
};