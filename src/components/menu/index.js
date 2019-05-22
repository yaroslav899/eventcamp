import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ActiveLink from '../hoc/ActiveLink';
import { imageUrlRecources } from '../../resources/url';
import { mainMenu } from '../../resources/menu';
import { titleList } from '../../resources/global';

class Menu extends Component {
  render() {
    const menuLinks = mainMenu.map((item) => <li key={item.id} className="menu-item">
      <ActiveLink to={item.url}>{item.name}</ActiveLink>
    </li>);

    return (
      <nav className="navbar navbar-expand-lg navbar-light" role="navigation">
        <div className="navbar-header">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <NavLink to="/" className="navbar-brand d-md-none" exact>
            <img src={imageUrlRecources.logo} alt={titleList.home} title={titleList.home} />
          </NavLink>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {menuLinks}
          </ul>
        </div>
      </nav>
    )
  }
}

export default Menu;
