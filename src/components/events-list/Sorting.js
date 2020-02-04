import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { updateSorting } from '../../redux/actions/eventActions';
import { fetchEventList } from '../../api';
import { sortingOptions } from '../../fixtures';

class Sorting extends PureComponent {
  handleChange = (selection) => {
    const { options, defaultPage, updateSorting, fetchEventList } = this.props;

    return new Promise((resolve) => resolve(updateSorting(selection || options[0])))
      .then(() => fetchEventList({ page : defaultPage }));
  }

  render() {
    const { options, value } = this.props;

    return (
      <Select
        className="events_sorting"
        options={options}
        onChange={this.handleChange}
        value={value}
      />
    );
  }
}

function mapStateToProps(store) {
  return {
    defaultPage: '1',
    value: store.eventState.sortingValue,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSorting: sortingValue => dispatch(updateSorting(sortingValue)),
    fetchEventList: params => dispatch(fetchEventList(params)),
  };
}

Sorting.defaultProps = { options: sortingOptions };

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
