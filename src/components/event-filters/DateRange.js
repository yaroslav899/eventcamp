import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ru';
import { connect } from 'react-redux';
import store from '../../store';
import { request } from '../../api';
import { filterRecources } from '../../resources';
import { globalRecources } from '../../resources/global';

class DateRange extends Component {
  handleDayClick = (day) => {
    if (new Date(day).toLocaleDateString() < new Date().toLocaleDateString()) {
      return false;
    }

    const { dateRange, noFilterResultMsg } = this.props;
    const range = DateUtils.addDayToRange(day, dateRange);

    store.dispatch({
      type: 'UPDATE_FILTER_DATERANGE',
      dateRange: range,
    });

    return request.getListPosts(range)
      .then(posts => {
        if (!posts.length) {
          posts.push({
            empty: noFilterResultMsg,
          });

          return false;
        }

        store.dispatch({
          type: 'UPDATE_EVENT_LIST',
          list: posts,
        });

        return range;
    });
  }

  handleResetClick = () => {
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

        store.dispatch({
          type: 'UPDATE_FILTER_DATERANGE',
          dateRange: {
            from: undefined,
            to: undefined
          },
        });
      });
  }

  render() {
    const { dateRange, locale, resetButton } = this.props;
    const { from, to } = dateRange;
    const modifiers = { start: from, end: to };

    return (
      <div className='date-range'>
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
            <br/>
            <button className="link" onClick={this.handleResetClick}>
              {resetButton}
            </button>
          </p>
        )}
      </div>
    );
  }
}

const dateToProps = function(storeData) {
  return {
    dateRange: storeData.filterState.dateRange,
    posts: storeData.filterState.list
  }
};

DateRange.defaultProps = {
  locale: 'ru',
  resetButton: filterRecources.reset,
  noFilterResultMsg: globalRecources.noFilterResult,
}

export default connect(dateToProps)(DateRange);