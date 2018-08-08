import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Menu from '../global/Menu';
import { globalRecources } from '../../recources';

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-4 text-justify">
                            <NavLink to="/" exact>
                                <img src="/img/logo.png" alt="" title="" />
                            </NavLink>
			            </div>
                            <div className="col-8 text-justify">
                                <div className="footer-menu">
                                    <Menu/>
                                </div>
                                <div className="clear"></div>
                                <div className="copyright">
                                    {globalRecources.copyright}
				                </div>
                            </div>
                        </div>
                </div>
            </footer>
        )
    }
}