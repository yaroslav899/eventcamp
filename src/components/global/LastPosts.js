import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import store from '../../store';
import { request } from '../../api';
import { getValueFromParams } from '../../helper';
import { categories, cities, free } from '../../fixtures';
import { listRecources, globalRecources } from '../../recources';

class LastPosts extends PureComponent {
  constructor(props) {
    super(props);
  }

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

  render() {
    const {
      lastPosts: {
        list,
      },
    } = this.props;
    if (!list) return <div></div>;
    const lastPosts = list.map((post) => <li key={post.id} className='last-post-rightside'>
      <NavLink to={`/events/${getValueFromParams(cities, post.acf.cities, 'name', 'url')}/${getValueFromParams(categories, post.categories[0], 'id', 'url')}/${post.id}`}>
        <div className="row">
          <div className="col-12">
            <div className="last-post-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></div>
          </div>
          <div className="col-6">
            <div className="last-post-location">
              {post.acf.cities}
              {post.acf.location}
            </div>
            <div className="last-post-date">
              {post.acf.dateOf
                ? moment(post.acf.dateOf, 'YYYY-MM-DD').format('DD MMM YYYY') : ''}
            </div>
          </div>
          <div className="col-6">
            <div className="last-post-price">
              {free.indexOf(post.acf.price) === -1 ? (post.acf.price + '' + post.acf.currency || '') : globalRecources.free}
            </div>
          </div>
          <div className="col-12">
            <div className="last-post-tags">{post.acf.tags
              ? post.acf.tags.split(',').map(tag => <span className="tagOpt" key={tag}>{tag}</span>) : ''}
            </div>
          </div>
        </div>
      </NavLink>
    </li>);
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
