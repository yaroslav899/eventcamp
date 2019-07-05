import React from 'react';
import { NavLink } from 'react-router-dom';
import Menu from '../menu';
import { imageUrlRecources } from '../../resources/url';
import { meta } from '../../resources/meta/hp';
import { globalRecources } from '../../resources/global';

const Footer = ({ logoUrl, copyrightText, privacyText, title}) => (
  <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col-6 col-md-4 text-justify">
          <NavLink to="/" exact>
            <img src={logoUrl} alt={title} title={title} />
          </NavLink>
        </div>
        <div className="col-6 col-md-8 text-right">
          <div className="footer-menu d-none d-md-block">
            <Menu />
          </div>
          <div className="copyright">
            {copyrightText}
            <br/>
            <NavLink to="/policy" exact>
              {privacyText}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

Footer.defaultProps = {
  logoUrl: imageUrlRecources.logo,
  copyrightText: globalRecources.copyright,
  privacyText: globalRecources.privacyText,
  title: meta.title,
};

export default Footer;
