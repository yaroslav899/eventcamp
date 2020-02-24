import React, { PureComponent } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import { connect } from 'react-redux';
import { withTranslation } from 'react-multi-lang';
import 'moment/locale/uk';
import { updateFilterDateRange } from '../../redux/actions/eventActions';
import { updateActivePage } from '../../redux/actions/paginationActions';
import { fetchEventList } from '../../api';

class DateRange extends PureComponent {
  handleDayClick = (day) => {
    const currentDate = new Date().toDateString();
    const filterDate = new Date(day).toDateString();

    if (new Date(filterDate) < new Date(currentDate)) {
      return false;
    }

    const { dateRange, defaultPage, updateDateRange, fetchEventList } = this.props;
    let range = DateUtils.addDayToRange(day, dateRange);

    if (!range.to) {
      range.to = range.from;
    }

    updateDateRange(range);

    if (!range.to && !range.from) {
      range = {};
    }

    range.page = defaultPage;

    return new Promise(resolve => resolve(updateActivePage(defaultPage)))
      .then(() => fetchEventList(range));
  }

  handleResetClick = () => {
    const { defaultPage, updateDateRange, updateActivePage, fetchEventList } = this.props;
    const dateRange = {
      from: undefined,
      to: undefined,
    };

    return new Promise(resolve => resolve(updateDateRange(dateRange)))
      .then(() => updateActivePage(defaultPage))
      .then(() => fetchEventList({ page: defaultPage }));
  }

  render() {
    const { dateRange, locale, t } = this.props;
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
            {from.toLocaleDateString()} - {to.toLocaleDateString()}
            <br />
            <button type="button" className="link" onClick={this.handleResetClick}>
              {t('global.button.cancel')}
            </button>
          </p>
        )}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    dateRange: store.eventState.dateRange,
    posts: store.eventState.list,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateDateRange: dateRange => dispatch(updateFilterDateRange(dateRange)),
    updateActivePage: page => dispatch(updateActivePage(page)),
    fetchEventList: params => dispatch(fetchEventList(params)),
  };
}

DateRange.defaultProps = {
  locale: 'uk',
  defaultPage: '1',
};

export default withTranslation(connect(mapStateToProps, mapDispatchToProps)(DateRange));
