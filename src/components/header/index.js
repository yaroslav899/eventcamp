import React from 'react';
import { NavLink } from 'react-router-dom';
import Menu from '../menu';
import AuthHeaderLink from './AuthHeaderLink';
import Search from './Search';
import { imageUrlRecources } from '../../resources/url';
import { meta } from '../../resources/meta/hp';

const Header = ({ logoUrl, title }) => (
  <header className="header sticky-top">
    <div className="authBlock">
      <div className="container">
        <div className="row">
          <div className="offset-md-2 col-sm-10 col-12">
            <AuthHeaderLink />
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-2 d-none d-sm-block d-md-none d-lg-block header__logo">
          <NavLink to="/" exact>
            <img src={logoUrl} alt={title} title={title} />
          </NavLink>
        </div>
        <div className="col-sm-10 col-xl-8 col-12">
          <Menu />
        </div>
        <div className="col-xl-2 d-none d-sm-none d-md-none d-lg-none d-xl-block header__search">
          <Search />
        </div>
      </div>
    </div>
  </header>
);

Header.defaultProps = {
  logoUrl: imageUrlRecources.logo,
  title: meta.title,
};

export default Header;
