import React, { Component } from 'react';
import moment from 'moment';
import { request } from '../../api';
import EventDetail from './EventDetail';
import DetailTabs from './DetailTabs';
import SocialShare from './SocialShare';
import Calendar from './Calendar';
import FeedBack from './FeedBack';
import DetailInteresting from './DetailInteresting';
import Adventages from '../global/Adventages';
import { free } from '../../fixtures';
import { globalRecources, imageUrlRecources } from '../../recources';

export default class DetailPage extends Component {
  state = {
    post: null,
  };

  componentDidMount() {
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
    const date = moment(data.acf.dateOf, "YYYY-MM-DD").format("Do MMM").split(' '),
          dateMonth = date[1],
          dateDay = date[0];
    return (
      <div className="container">
        <Adventages />
        <div className="row">
          <div className="col-9">
            <h1 dangerouslySetInnerHTML={{ __html: data.title.rendered }}></h1>
            <EventDetail event={data} date={date}/>
            <div className="row area-2">
              <div className="col-12">
                <DetailTabs data={data} />
              </div>
            </div>
          </div>
          <div className="col-3 right-side">
            <SocialShare data={data} />
            <Calendar data={data} />
            <FeedBack data={data} />
            <DetailInteresting data={data} />
          </div>
        </div>
      </div>
    )
  }
};
