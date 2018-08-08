import React, { Component } from 'react';
import DateRange from './DateRange';
import SelectFilter from './SelectFilter';

export default class Filters extends Component {
    render() {
        return (
            <div>
                <DateRange />
                <SelectFilter />
            </div>
        )
    }
}