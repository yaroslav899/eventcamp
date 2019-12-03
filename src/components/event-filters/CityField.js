import React, { PureComponent, Fragment } from 'react';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateFilterCity } from '../../redux/actions/eventActions';
import { updateActivePage } from '../../redux/actions/paginationActions';
import { fetchEventList } from '../../api';
import { cities } from '../../fixtures';
import { filterRecources } from '../../resources';
import { getHistoryUrl } from '../../helper';

class CityField extends PureComponent {
  changeCity = (selection) => {
    const params = !selection ? { ['cities']: '' } : { [selection.type]: selection ? selection.value : '' };
    const { defaultPage, updateCity, updateActivePage, fetchEventList } = this.props;

    return new Promise((resolve) => resolve(this.changeHistory(selection)))
      .then(() => updateCity(params.cities))
      .then(() => updateActivePage(defaultPage))
      .then(() => fetchEventList(params));
  };

  changeHistory = (selection) => {
    const { history, changeHistory } = this.props;

    if (changeHistory) {
      const url = getHistoryUrl('cities', selection, '');
      history.push(url);
    }

    return true;
  }

  render() {
    const { cityValue, fieldLabel } = this.props;

    return (
      <Fragment>
        <p>{fieldLabel}</p>
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
  return { cityValue: store.eventState.cities };
}

function mapDispatchToProps(dispatch) {
  return {
    updateCity: cities => dispatch(updateFilterCity(cities)),
    updateActivePage: page => dispatch(updateActivePage(page)),
    fetchEventList: params => dispatch(fetchEventList(params)),
  };
}

CityField.defaultProps = {
  defaultPage: '1',
  fieldLabel: filterRecources.city,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CityField));
