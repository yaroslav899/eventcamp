import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Menu from '../global/Menu';
import { globalRecources } from '../../recources';

export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-2 d-none d-sm-block">
                            <div id="logo" className="main-logo">
                                <NavLink to="/" exact>
                                    <img src="/img/logo.png" alt="" title="" />
                                </NavLink>
                            </div>
                        </div>
                        <div className="col-sm-10 col-12">
                            <div className="registration">
                                <div className="auth">
                                    <NavLink to="/" activeClassName="active">{globalRecources.enter}</NavLink>
                                    <NavLink to="/register" activeClassName="active">{globalRecources.registr}</NavLink>    
                                </div>
                            </div>  
                            <Menu/>  
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}