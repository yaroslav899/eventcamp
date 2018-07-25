import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ru';
import store from '../../store'
import { connect } from 'react-redux';
import {request} from '../../api';


class DateRange extends Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.state = {
            locale: 'ru'
        };
    }

    handleDayClick(day) {
        if (new Date(day).toLocaleDateString() < new Date().toLocaleDateString()) {
            return;
        }
        const range = DateUtils.addDayToRange(day, this.props.dateRange);
        store.dispatch({
            type: 'UPDATE_FILTER_DATERANGE',
            dateRange     :   range
        });
        request.getListPosts(range)
            .then(posts => {
                store.dispatch({
                    type: 'EVENT_LIST_UPDATE',
                    list: posts
                });
                return range;
            })

    }
    handleResetClick() {
        store.dispatch({
            type: 'UPDATE_FILTER_DATERANGE',
            dateRange     :   {
                from: undefined,
                to: undefined
            }
        });
    }

    render() {
        const { from, to } = this.props.dateRange;
        const modifiers = { start: from, end: to };
        return (
            <div className='date-range'>
                <DayPicker
                    localeUtils={MomentLocaleUtils}
                    locale={this.state.locale}
                    selectedDays={[from, { from, to }]}
                    disabledDays={[
                    {
                        after: new Date(false),
                        before: new Date()
                    }
                ]}
                    modifiers={modifiers}
                    onDayClick={this.handleDayClick}
                />
                {from && to && (
                    <p>
                        {from.toLocaleDateString()} по {to.toLocaleDateString()}
                        <br/><button className="link" onClick={this.handleResetClick}>
                            сбросить
                        </button>
                    </p>
                )}
            </div>
        );
    }

}

const dateToProps = function(store) {
    return {
        dateRange : store.filterState.dateRange,
        posts   : store.filterState.list
    }
};

export default connect(dateToProps)(DateRange);