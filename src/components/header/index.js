import React from 'react';
import { NavLink } from 'react-router-dom';
import Menu from '../menu';
import AuthHeaderLink from './AuthHeaderLink';
import { imageUrlRecources } from '../../recources';

const Header = () => (
  <header className="header">
    <div className="container">
      <div className="row">
        <div className="col-2 d-none d-sm-block">
          <div id="logo" className="header__logo">
            <NavLink to="/" exact>
              <img src={imageUrlRecources.logo} alt="" title="" />
            </NavLink>
          </div>
        </div>
        <div className="col-sm-10 col-12">
          <AuthHeaderLink />
          <Menu />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
