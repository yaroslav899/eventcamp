import React, { PureComponent, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { categories, cities } from '../../fixtures';
import { getValueFromParams } from '../../helper';

class ServicePicture extends PureComponent {
  render() {
    const { city, defaultCity } = this.props;
    const eventCity = getValueFromParams(cities, city, 'id', 'url');
    const categoryBanners = categories.map(category => <div key={category.id} className="col-6 col-sm-4 text-center">
      <NavLink to={`/events/${eventCity || defaultCity}/${category.url}`}>
        <img src={category.img} alt={category.name} title={category.name} className="img-fluid" />
        <br />
        <p>{category.name}</p>
      </NavLink>
    </div>);
    return (
      <Fragment>
        {categoryBanners}
      </Fragment>
    );
  }
}

function mapStateToProps(store) {
  return { city: store.eventState.cities };
}

ServicePicture.defaultProps = { defaultCity: 'any' };

export default connect(mapStateToProps)(ServicePicture);
