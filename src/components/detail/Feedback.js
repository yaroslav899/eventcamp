import React, { Component } from 'react';
import { globalRecources, detailRecources } from '../../recources';

class FeedBackURL extends Component {
    render(){
        if (!this.props.data) return <div>{globalRecources.loading}</div>;
        let data = this.props.data;

        return (
            <div className="feedback-detail-right">
                <a href="" className="write-organisator" title="">{detailRecources.writeAuthor}</a><br/>
                <a href="" className="feedback-registration" title="">{detailRecources.register}</a>
            </div>
        )
    }
}

export default FeedBackURL;