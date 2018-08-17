import React, { Component } from 'react';
import { urlRecources } from '../../recources';
import { detailRecources, globalRecources, imageUrlRecources } from '../../recources';

export default class Calendar extends Component {
    render(){
        if (!this.props.data) return <div>{globalRecources.loading}</div>;
        let data = this.props.data,
            date = data.acf.dateOf.replace(/-/ig, ''),
            location = data.acf.cities + ',' + data.acf.location,
            calGoggles = urlRecources.calGoggle + encodeURI(data.title.rendered) + '&dates=' + date + 'T000000/' + date + 'T235959&location=' + encodeURI(location) + '&details=' + window.location.href + ' +&trp=false&sprop=' + encodeURI(location.href) + 'sprop=name:Event-camp';

        return (
            <div className="calendar-link">
                <p>{detailRecources.addToCalendar}</p>
                <a href={calGoggles}>
                    <img src={imageUrlRecources.googleLogo} className="googleCal" />
                </a>
            </div>
        )
    }
}