import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-multi-lang';
import ActiveLink from '../hoc/ActiveLink';
import store from '../../store';
import { updateActivePage } from '../../redux/actions/paginationActions';
import { imageUrlRecources } from '../../resources/url';
import { meta } from '../../resources/meta/hp';
import { mainMenu } from '../../resources/menu';

class Menu extends Component {
  closeMenu = () => {
    const { defaultPage } = this.props;
    // ToDO optimize it. Added for hiddung menu after click
    $('.collapse').collapse('hide');
    // ToDo need to implement abother solution for remove another number of page
    store.dispatch(updateActivePage(defaultPage));
  }

  render() {
    const { logoUrl, title, t } = this.props;
    const menuLinks = mainMenu.map((item) => {
      const menuLabel = `menu.${item.id}`;

      if (item.id === 'articles') {
        return (
          <li key={item.id} className="menu-item">
            <a href={item.url}>
              {t(menuLabel)}
            </a>
          </li>
        );
      }

      return (
        <li key={item.id} className="menu-item">
          <ActiveLink to={item.url} onClick={this.closeMenu}>
            {t(menuLabel)}
          </ActiveLink>
        </li>
      );
    });

    return (
      <nav className="navbar navbar-expand-lg navbar-light" role="navigation">
        <div className="navbar-header">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <NavLink to="/" className="navbar-brand d-lg-none" exact>
            <img src={logoUrl} alt={title} title={title} />
          </NavLink>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {menuLinks}
          </ul>
        </div>
      </nav>
    );
  }
}

Menu.defaultProps = {
  defaultPage: '1',
  logoUrl: imageUrlRecources.logo,
  title: meta.title,
};

export default withTranslation(Menu);
