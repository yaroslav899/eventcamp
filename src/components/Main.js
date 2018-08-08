import React, { Component } from 'react';
import Adventages from './global/Adventages';
import ServicePicture from './global/ServicePicture';
import Banner from './global/Banner';

export default class Main extends Component {
    render() {
        return (
            <div className="container">
                <Banner />
                <Adventages />
                <ServicePicture />
            </div>
        )
    }
}