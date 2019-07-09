import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ActiveLink from '../hoc/ActiveLink';
import { imageUrlRecources } from '../../resources/url';
import { mainMenu } from '../../resources/menu';
import { meta } from '../../resources/meta/hp';

class Menu extends Component {
  closeMenu = () => {
    // ToDO optimize it. Added for hiddung menu after click
    $('.collapse').collapse('hide');
  }

  render() {
    const { logoUrl, title } = this.props;
    const menuLinks = mainMenu.map((item) => {
      if (item.id === 'articles') {
        return (
          <li key={item.id} className="menu-item">
            <a href={item.url}>{item.name}</a>
          </li>
        )
      }
      return (
        <li key={item.id} className="menu-item">
          <ActiveLink to={item.url} onClick={this.closeMenu}>{item.name}</ActiveLink>
        </li>
      )
    });

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
          <NavLink to="/" className="navbar-brand d-lg-none" exact>
            <img src={logoUrl} alt={title} title={title} />
          </NavLink>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {menuLinks}
          </ul>
        </div>
      </nav>
    );
  }
}

Menu.defaultProps = {
  logoUrl: imageUrlRecources.logo,
  title: meta.title,
};

export default Menu;
