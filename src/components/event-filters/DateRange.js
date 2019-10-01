import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import { connect } from 'react-redux';
import 'moment/locale/uk';
import store from '../../store';
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

    const { dateRange, noFilterResultMsg } = this.props;
    let range = DateUtils.addDayToRange(day, dateRange);

    if (!range.to) {
      range.to = range.from;
    }

    store.dispatch({
      type: 'UPDATE_FILTER_DATERANGE',
      dateRange: range,
    });

    if (!range.to && !range.from) {
      range = {};
    }

    return request.getListPosts(range)
      .then(posts => {
        if (!posts.length) {
          posts.push({
            empty: noFilterResultMsg,
          });
        }

        store.dispatch({
          type: 'UPDATE_EVENT_LIST',
          list: posts,
        });

        return true;
      });
  }

  handleResetClick = () => {
    store.dispatch({
      type: 'UPDATE_FILTER_DATERANGE',
      dateRange: {
        from: undefined,
        to: undefined,
      },
    });

    return request.getListPosts({})
      .then(posts => {
        if (!posts.length) {
          const { noFilterResultMsg } = this.props;

          posts.push({ empty: noFilterResultMsg });
        }

        store.dispatch({
          type: 'UPDATE_EVENT_LIST',
          list: posts,
        });
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

const dateToProps = (storeData) => {
  return {
    dateRange: storeData.filterState.dateRange,
    posts: storeData.filterState.list,
  };
};

DateRange.defaultProps = {
  locale: 'uk',
  resetButton: filterRecources.reset,
  noFilterResultMsg: globalRecources.noFilterResult,
};

export default connect(dateToProps)(DateRange);
