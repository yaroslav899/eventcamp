import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import EventLocation from '../event-global/EventLocation';
import EventDate from '../event-global/EventDate';
import EventPrice from '../event-global/EventPrice';
import EventTags from '../event-global/EventTags';
import store from '../../store';
import { request } from '../../api';
import { getValueFromParams, createMarkupText } from '../../helper';
import { categories, cities } from '../../fixtures';
import { listRecources } from '../../resources';

class LastPosts extends PureComponent {
  componentDidMount() {
    const { lastPosts: { list } } = this.props;

    if (list) {
      return false;
    }

    return request.getLastPosts().then((posts) => {
      store.dispatch({
        type: 'UPDATE_LAST_POSTS',
        list: posts,
      });
    });
  }

  render() {
    const { lastPosts: { list } } = this.props;

    if (!list) return <Fragment />;

    const lastPosts = list.map((post) => {
      const category = getValueFromParams(categories, post.categories[0], 'id', 'url');

      return (
        <li key={post.id}>
          <NavLink to={`/events/${post.acf.cities}/${category}/${post.id}`}>
            <div className="row">
              <div className="col-12">
                <div className="last-post-title" dangerouslySetInnerHTML={createMarkupText(post.title.rendered)} />
              </div>
              <div className="col-8">
                <EventLocation className="last-post-location" city={post.acf.cities} address={post.acf.location} />
                <EventDate className="last-post-date" date={post.acf.dateOf} />
              </div>
              <div className="col-4">
                <EventPrice className="last-post-price" price={post.acf.price} currency={post.acf.currency} />
              </div>
              <EventTags className="col-12 last-post-tags" tags={post.acf.tags} />
            </div>
          </NavLink>
        </li>
      );
    });

    return (
      <div className="last-post-list">
        <h4>{listRecources.lastEvent}</h4>
        <ul>
          {lastPosts}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = storeData => {
  return { lastPosts: storeData.lastPosts };
};

export default connect(mapStateToProps)(LastPosts);
