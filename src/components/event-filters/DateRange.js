import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import { connect } from 'react-redux';
import 'moment/locale/uk';
import { updateEventList, updateFilterDateRange } from '../../redux/actions/filterActions';
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

    const { dateRange, defaultPage, noFilterResultMsg, updateFilterDateRange, updateEventList } = this.props;
    let range = DateUtils.addDayToRange(day, dateRange);

    if (!range.to) {
      range.to = range.from;
    }

    updateFilterDateRange(range);

    if (!range.to && !range.from) {
      range = {};
    }

    range.page = defaultPage;

    return request.getListPosts(range)
      .then(posts => {
        if (!posts.length) {
          posts.push({
            empty: noFilterResultMsg,
          });
        }

        updateEventList(posts);

        return true;
      });
  }

  handleResetClick = () => {
    const { defaultPage, updateFilterDateRange, updateEventList } = this.props;
    const dateRange = {
      from: undefined,
      to: undefined,
    };

    updateFilterDateRange(dateRange);

    return request.getListPosts({ page: defaultPage })
      .then(posts => {
        if (!posts.length) {
          const { noFilterResultMsg } = this.props;

          posts.push({ empty: noFilterResultMsg });
        }

        updateEventList(posts);
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
            <button className="link" onClick={this.handleResetClick}>
              {resetButton}
            </button>
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (storeData) => {
  return {
    dateRange: storeData.filterState.dateRange,
    posts: storeData.filterState.list,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateEventList: posts => dispatch(updateEventList(posts)),
    updateFilterDateRange: dateRange => dispatch(updateFilterDateRange(dateRange)),
  };
};

DateRange.defaultProps = {
  locale: 'uk',
  resetButton: filterRecources.reset,
  noFilterResultMsg: globalRecources.noFilterResult,
  defaultPage: '1',
};

export default connect(mapStateToProps, mapDispatchToProps)(DateRange);
