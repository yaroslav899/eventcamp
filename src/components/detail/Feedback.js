import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {calGoggle} from '../../urls';

class FeedBackURL extends Component {
    render(){
        if (!this.props.data) return <div>Загрузка...</div>;
        let data = this.props.data;

        return (
            <div className="feedback-detail-right">
                <a href="" className="write-organisator" title="">Написать организатору</a><br/>
                <a href="" className="feedback-registration" title="">Зарегистрироваться</a>
            </div>
        )
    }
}

export default FeedBackURL;