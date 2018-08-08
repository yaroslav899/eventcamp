import React, { Component } from 'react';
import { advantRecources } from '../../recources';

export default class Adventages extends Component {
    render() {
        return (
                <div className="row advant">
                    <div className="col-md-3 text-center">
                        <img src="/img/lamp.png" alt={advantRecources.first} title={advantRecources.first} className="adv-img img-fluid" />
                        <span className="adv-text">{advantRecources.first}</span>
                    </div>
                    <div className="col-md-3 text-center">
                        <img src="/img/contact.png" alt={advantRecources.second} title={advantRecources.second} className="adv-img img-fluid" />
                        <span className="adv-text">{advantRecources.second}</span>
                    </div>
                    <div className="col-md-3 text-center">
                        <img src="/img/popular.png" alt={advantRecources.third} title={advantRecources.third} className="adv-img img-add img-fluid" />
                        <span className="adv-text">{advantRecources.third}</span>
                    </div>
                    <div className="col-md-3 text-center">
                        <img src="/img/themes.png" alt={advantRecources.four} title={advantRecources.four} className="adv-img img-add img-fluid" />
                        <span className="adv-text last">{advantRecources.four}</span>
                    </div>
                </div>         
        )
    }
}