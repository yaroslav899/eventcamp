import React, { PureComponent, Fragment } from 'react';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateEventList, updateFilterCity } from '../../redux/actions/filterActions';
import { request } from '../../api';
import { cities } from '../../fixtures';
import { filterRecources } from '../../resources';
import { globalRecources } from '../../resources/global';
import { getHistoryUrl } from '../../helper';

class CityField extends PureComponent {
  changeCity = (selection) => {
    const { history, changeHistory } = this.props;

    this.changeSelection('cities', selection);

    if (changeHistory) {
      const url = getHistoryUrl('cities', selection, '');
      history.push(url);
    }
  };

  changeSelection = (type, selection) => {
    const params = !selection ? { [type]: '' } : { [selection.type]: selection ? selection.value : '' };
    const { defaultPage, updateEvents, updateCity } = this.props;

    params.page = defaultPage;

    return request.getListPosts(params)
      .then((posts) => {
        if (!posts.length) {
          posts.push({ empty: globalRecources.noFilterResult });
        }

        updateEvents(posts);
        updateCity(params.cities);

        return params;
      });
  };

  render() {
    const { cities: cityValue } = this.props;

    return (
      <Fragment>
        <p>{filterRecources.city}</p>
        <Select
          name="form-field-cities"
          label="cities"
          options={cities.map(city => ({
            label: city.name,
            value: city.id,
            type: 'cities',
          }))}
          value={cityValue}
          onChange={this.changeCity}
        />
      </Fragment>
    );
  }
}

function mapStateToProps(store) {
  return { cities: store.filterState.cities };
}

function mapDispatchToProps(dispatch) {
  return {
    updateEvents: posts => dispatch(updateEventList(posts)),
    updateCity: cities => dispatch(updateFilterCity(cities)),
  };
}

CityField.defaultProps = { defaultPage: '1' };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CityField));
