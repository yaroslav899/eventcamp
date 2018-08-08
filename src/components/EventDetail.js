import React, { Component } from 'react'
import { request } from '../api';
import moment from 'moment';
import DetailTabs from './detail/DetailTabs';
import SocialShare from './detail/SocialShare';
import Calendar from './detail/Calendar';
import FeedBack from './detail/FeedBack';
import Adventages from './global/Adventages';
import DetailInteresting from './detail/DetailInteresting';
import { categories, cities, free } from '../fixtures';
import { detailRecources, globalRecources, imageUrlRecources } from '../recources';

class EventDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null
        };
    }

    componentDidMount () {
        return request.getPostDetail(this.props.match.params.id)
            .then(post => {
                this.setState({
                    post: post
                });
                return post;
            }).then(data => {
                document.title = data.title.rendered;
            })
    }

    render(){
        if (!this.state.post) return <div>{globalRecources.loading}</div>;
        let data = this.state.post;
        let date = moment(data.acf.dateOf, "YYYY-MM-DD").format("Do MMM").split(' '),
            dateMonth = date[1],
            dateDay = date[0];
        return(
            <div className="container">
                <Adventages/>
                <div className="row">
                    <div className="col-9">
                        <h1 dangerouslySetInnerHTML={{__html: data.title.rendered}}></h1>
                        <div className="row area-1">
                            <div className="col-6 area-1_image">
                                <img src={data.acf.picture || imageUrlRecources.noPhoto} className="detail-picture"/>
                            </div>
                            <div className="col-6 area-1_text">
                                <div className="text-right area-1_price">
                                    {free.indexOf(data.acf.price) === -1 ? (data.acf.price + '' + data.acf.currency || '') : globalRecources.free}
                                </div>
                                <div className="area-1_info">
                                    <span className="day">{dateDay}</span>
                                    <span className="month">{dateMonth}</span>
                                    <span className="time">{data.acf.time}</span>
                                    <p className="area-1_tags">
                                    {data.acf.tags ?
                                        data.acf.tags.split(',').map(tag =>
                                            <span className="tagOpt">{tag}</span>
                                        ) : ''}
                                    </p>
                                    <p className="area-1_location">
                                        {data.acf.cities}, {data.acf.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row area-2">
                            <div className="col-12">
                                <DetailTabs data={data}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 right-side">
                        <SocialShare data={data}/>
                        <Calendar data={data}/>
                        <FeedBack data={data}/>
                        <DetailInteresting data={data}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default EventDetail;