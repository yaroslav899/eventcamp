import React from 'react';
import { NavLink } from 'react-router-dom';
import Menu from '../menu';
import { imageUrlRecources } from '../../resources/url';
import { globalRecources, titleList } from '../../resources/global';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col-6 col-md-4 text-justify">
          <NavLink to="/" exact>
            <img src={imageUrlRecources.logo} alt={titleList.home} title={titleList.home} />
          </NavLink>
        </div>
        <div className="col-6 col-md-8 text-right">
          <div className="footer-menu d-none d-md-block">
            <Menu />
          </div>
          <div className="clear" />
          <div className="copyright">
            {globalRecources.copyright}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;