import React from 'react';
import { NavLink } from 'react-router-dom';
import Menu from '../menu';
import { imageUrlRecources } from '../../resources/url';
import { globalRecources, titleList } from '../../resources/global';

const Footer = (props) => (
  <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col-6 col-md-4 text-justify">
          <NavLink to="/" exact>
            <img src={props.logoUrl} alt={titleList.home} title={titleList.home} />
          </NavLink>
        </div>
        <div className="col-6 col-md-8 text-right">
          <div className="footer-menu d-none d-md-block">
            <Menu />
          </div>
          <div className="clear" />
          <div className="copyright">
            {props.copyrightText}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

Footer.defaultProps = {
  logoUrl: imageUrlRecources.logo,
  copyrightText: globalRecources.copyright,
};

export default Footer;
