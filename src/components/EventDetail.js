import React, { Component } from 'react';
import moment from 'moment';
import { request } from '../api';
import DetailTabs from './detail/DetailTabs';
import SocialShare from './detail/SocialShare';
import Calendar from './detail/Calendar';
import FeedBack from './detail/FeedBack';
import Adventages from './global/Adventages';
import DetailInteresting from './detail/DetailInteresting';
import { free } from '../fixtures';
import { globalRecources, imageUrlRecources } from '../recources';

export default class EventDetail extends Component {
  state = {
      post: null,
  };

  componentDidMount () {
    return request.getPostDetail(this.props.match.params.id)
      .then(post => {
        this.setState({
          post: post,
        });
        document.title = post.title.rendered
        return;
      });
  }

  render() {
    const { post: data } = this.state;
    if (!data) return <div>{globalRecources.loading}</div>;
    const date = moment(data.acf.dateOf, "YYYY-MM-DD").format("Do MMM").split(' ');
    const dateMonth = date[1];
    const dateDay = date[0];
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
};
