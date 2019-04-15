import React from 'react';
import { NavLink } from 'react-router-dom';
import Menu from '../menu';
import { globalRecources, imageUrlRecources } from '../../resources';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col-6 col-md-4 text-justify">
          <NavLink to="/" exact>
            <img src={imageUrlRecources.logo} alt="" title="" />
          </NavLink>
        </div>
        <div className="col-6 col-md-8 text-right">
          <div className="footer-menu d-none d-md-block">
            <Menu />
          </div>
          <div className="clear"></div>
          <div className="copyright">
            {globalRecources.copyright}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;