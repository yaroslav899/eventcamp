import React from 'react';
import { NavLink } from 'react-router-dom';
import Menu from '../global/Menu';
import { globalRecources, imageUrlRecources } from '../../recources';

const Footer = () => (
    <footer className="footer">
        <div className="container">
            <div className="row">
                <div className="col-4 text-justify">
                    <NavLink to="/" exact>
                        <img src={imageUrlRecources.logo} alt="" title="" />
                    </NavLink>
                </div>
                <div className="col-8 text-justify">
                    <div className="footer-menu">
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