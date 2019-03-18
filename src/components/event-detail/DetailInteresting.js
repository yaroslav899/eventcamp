import React, { Component } from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import store from '../../store';
import { request } from '../../api';
import { categories, cities } from '../../fixtures';
import { getValueFromParams } from '../../helper';
import { imageUrlRecources, detailRecources } from '../../resources';

export default class DetailInteresting extends Component {
  state = {
    posts: null,
  };

  componentDidMount() {
    const { data } = this.props;

    return request.getInterestingData(data).then((posts) => {
      this.setState({
        posts: posts.filter(post => post.id !== data.id),
      });
    });
  }

  handleUpdateDetailPage(data) {
    request.getInterestingData(post).then((posts) => {
      this.setState({
        posts: posts.filter(post => post.id !== data.id),
      });
    });

    store.dispatch({
      type: 'UPDATE_DETAIL_POST',
      post: data,
    });
  }

  createMarkupText(text) {
    return { __html: text };
  }

  render() {
    const { posts } = this.state;

    if (!posts) return <div />;

    const samePosts = posts.map(samePost => <li key={samePost.id} className="same-post-rightside">
      <NavLink onClick={this.handleUpdateDetailPage.bind(this, samePost)} to={`/events/${getValueFromParams(cities, samePost.acf.cities, 'name', 'url')}/${getValueFromParams(categories, samePost.categories[0], 'id', 'url')}/${samePost.id}`}>
        <div className="row">
          <div className="col-12">
            <img src={samePost.acf.picture || imageUrlRecources.noPhoto} alt="" className="" />
            <div className="samePost-info-rightside row">
              <div className="samePost-title col-7" dangerouslySetInnerHTML={this.createMarkupText(samePost.title.rendered)} />
              <div className="samePost-price text-right col-5">
                {samePost.acf.price}
                {samePost.acf.currency ? ` ${samePost.acf.currency}` : ''}
              </div>
              <div className="samePost-location col-7">
                {samePost.acf.cities}
                {samePost.acf.location}
              </div>
              <div className="samePost-date text-right col-5">
                {samePost.acf.dateOf ? moment(samePost.acf.dateOf, 'YYYY-MM-DD').format('DD MMM YYYY') : ''}
              </div>
            </div>
          </div>
        </div>
        </NavLink>
    </li>);

    return (
      <div className="detail-interesting">
        <h4>{detailRecources.maybeInteresting}</h4>
        {samePosts}
      </div>
    );
  }
}
