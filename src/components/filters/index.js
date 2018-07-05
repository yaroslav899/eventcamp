import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DateRange from './DateRange'
import SelectFilter from './SelectFilter'

class Filters extends Component {
    static propTypes = {
    };

    render() {
        return (
            <div>
                <DateRange />
                <SelectFilter />
            </div>
        )
    }
}

export default Filters