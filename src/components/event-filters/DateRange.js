import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import { connect } from 'react-redux';
import 'moment/locale/uk';
import { updateEventList, updateFilterDateRange } from '../../redux/actions/filterActions';
import { updateActivePage } from '../../redux/actions/paginationActions';
import { request } from '../../api';
import { filterRecources } from '../../resources';
import { globalRecources } from '../../resources/global';

class DateRange extends Component {
  handleDayClick = (day) => {
    const currentDate = new Date().toDateString();
    const filterDate = new Date(day).toDateString();

    if (new Date(filterDate) < new Date(currentDate)) {
      return false;
    }

    const { dateRange, defaultPage, noFilterResultMsg, updateDateRange, updateEvents } = this.props;
    let range = DateUtils.addDayToRange(day, dateRange);

    if (!range.to) {
      range.to = range.from;
    }

    updateDateRange(range);

    if (!range.to && !range.from) {
      range = {};
    }

    range.page = defaultPage;

    return request.getListPosts(range)
      .then(posts => {
        if (!posts.length) {
          posts.push({ empty: noFilterResultMsg });
        }

        updateEvents(posts);

        return true;
      });
  }

  handleResetClick = () => {
    const { defaultPage, updateDateRange, updateEvents, updateActivePage } = this.props;
    const dateRange = {
      from: undefined,
      to: undefined,
    };

    updateDateRange(dateRange);
    updateActivePage(defaultPage);

    return request.getListPosts({ page: defaultPage })
      .then(posts => {
        if (!posts.length) {
          const { noFilterResultMsg } = this.props;

          posts.push({ empty: noFilterResultMsg });
        }

        updateEvents(posts);
      });
  }

  render() {
    const { dateRange, locale, resetButton } = this.props;
    const { from, to } = dateRange;
    const modifiers = { start: from, end: to };

    return (
      <div className="date-range">
        <DayPicker
          localeUtils={MomentLocaleUtils}
          locale={locale}
          selectedDays={[from, { from, to }]}
          disabledDays={[
            {
              after: new Date(false),
              before: new Date(),
            },
          ]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
        {from && to && (
          <p>
            {from.toLocaleDateString()} по {to.toLocaleDateString()}
            <br />
            <button type="button" className="link" onClick={this.handleResetClick}>
              {resetButton}
            </button>
          </p>
        )}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    dateRange: store.filterState.dateRange,
    posts: store.filterState.list,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateEvents: posts => dispatch(updateEventList(posts)),
    updateDateRange: dateRange => dispatch(updateFilterDateRange(dateRange)),
    updateActivePage: page => dispatch(updateActivePage(page)),
  };
}

DateRange.defaultProps = {
  locale: 'uk',
  resetButton: filterRecources.reset,
  noFilterResultMsg: globalRecources.noFilterResult,
  defaultPage: '1',
};

export default connect(mapStateToProps, mapDispatchToProps)(DateRange);
