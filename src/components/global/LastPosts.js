import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import store from '../../store';
import { request } from '../../api';
import { getValueFromParams } from '../../helper';
import { categories, cities, free } from '../../fixtures';
import { listRecources, globalRecources } from '../../resources';

class LastPosts extends PureComponent {
  componentDidMount() {
    const {
      lastPosts: {
        list,
      },
    } = this.props;

    if (list) return;

    request.getLastPosts().then(posts => {
      store.dispatch({
        type: 'UPDATE_LAST_POSTS',
        list: posts,
      });
    });
  }

  createMarkupText(text) {
    return { __html: text };
  }

  render() {
    const {
      lastPosts: {
        list,
      },
    } = this.props;

    if (!list) return <div></div>;

    const lastPosts = list.map((post) => {
      let city = getValueFromParams(cities, post.acf.cities, 'name', 'url');
      let category = getValueFromParams(categories, post.categories[0], 'id', 'url');
      let location = `${post.acf.cities}, ${post.acf.location}`;
      let date = post.acf.dateOf ? moment(post.acf.dateOf, 'YYYY-MM-DD').format('DD MMM YYYY') : '';
      let price = !free.includes(post.acf.price) ? (post.acf.price + ' ' + post.acf.currency || '') : globalRecources.free ;

      return (
        <li key={post.id}>
          <NavLink to={`/events/${city}/${category}/${post.id}`}>
            <div className="row">
              <div className="col-12">
                <div className="last-post-title" dangerouslySetInnerHTML={this.createMarkupText(post.title.rendered)}></div>
              </div>
              <div className="col-8">
                <div className="last-post-location">
                  {location}
                </div>
                <div className="last-post-date">
                  {date}
                </div>
              </div>
              <div className="col-4">
                <div className="last-post-price">
                  {price}
                </div>
              </div>
              <div className="col-12">
                <div className="last-post-tags">{post.acf.tags
                  ? post.acf.tags.split(',').map(tag => <span className="tagOpt" key={tag}>{tag}</span>) : ''}
                </div>
              </div>
            </div>
          </NavLink>
        </li>
      )
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

const mapStateToProps = function (store) {
  return {
    lastPosts: store.lastPosts,
  };
};

export default connect(mapStateToProps)(LastPosts);