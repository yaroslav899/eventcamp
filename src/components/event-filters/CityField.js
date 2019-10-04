import React, { PureComponent, Fragment } from 'react';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../store';
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

    return request.getListPosts(params)
      .then((posts) => {
        if (!posts.length) {
          posts.push({ empty: globalRecources.noFilterResult });
        }

        store.dispatch({
          type: 'UPDATE_EVENT_LIST',
          list: posts,
        });

        store.dispatch({
          type: 'UPDATE_FILTER_CITY',
          cities: params['cities'],
        });

        return params;
      });
  };

  render() {
    const { cities: cityFilter } = this.props;

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
          value={cityFilter}
          onChange={this.changeCity}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (storeData) => {
  return { cities: storeData.filterState.cities };
};

export default withRouter(connect(mapStateToProps)(CityField));
