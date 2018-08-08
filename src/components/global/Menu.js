import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { mainMenu } from '../../recources';

export default class Menu extends Component {
    render() {
        let menuLinks = mainMenu.map(menu => <li key={menu.id} className="menu-item">
            <NavLink to={menu.url} exact activeClassName="active">
                {menu.name}
            </NavLink>
            </li>
        );
        return (
            <nav className="navbar navbar-expand-lg navbar-light ">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {menuLinks}
                    </ul>
                </div>
            </nav>
        )
    }
}