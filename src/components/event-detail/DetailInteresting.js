import React, { PureComponent, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import EventLocation from '../event-global/EventLocation';
import EventDate from '../event-global/EventDate';
import EventPrice from '../event-global/EventPrice';
import store from '../../store';
import { request } from '../../api';
import { getValueFromParams, createMarkupText } from '../../helper';
import { categories } from '../../fixtures';
import { detailRecources } from '../../resources';
import { imageUrlRecources } from '../../resources/url';

class DetailInteresting extends PureComponent {
  _isMounted = false;

  state = { posts: [] };

  componentDidMount() {
    const { data } = this.props;

    this._isMounted = true;

    store.dispatch({
      type: 'UPDATE_DETAIL_POST',
      post: data,
    });

    return request.getInterestingData(data, true).then((posts) => {
      if (this._isMounted) {
        if (!posts || !posts.length) {
          return request.getInterestingData(data, false).then((newPosts) => {
            this.updateDetailInterestingPosts(newPosts, data);
          });
        }

        return this.updateDetailInterestingPosts(posts, data);
      }
    });
  }

  updateDetailInterestingPosts = (posts, data) => {
    if (!posts) return false;

    this.setState({ posts: posts.filter(post => post.id !== data.id) });

    return true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { posts } = this.state;

    if (!posts.length) return <Fragment />;

    const { maybeInteresting } = this.props;
    const samePosts = posts.map((samePost) => {
      const {
        id: postID,
        categories: postCategories = ['it'],
        title: { rendered: postTitle },
        acf: {
          picture,
          picture_url,
          price = '',
          currency = '',
          cities: postCity,
          location,
          dateOf,
        },
      } = samePost;
      const category = getValueFromParams(categories, postCategories[0], 'id', 'url');
      const eventUrl = `/events/${postCity}/${category}/${postID}`;
      const { noPhotoUrl } = this.props;

      return <li key={postID}>
        <NavLink to={eventUrl}>
          <div className="row">
            <div className="col-12">
              <img src={picture || picture_url || noPhotoUrl} alt={postTitle} />
              <div className="samePost-info-rightside row">
                <div className="col-7" dangerouslySetInnerHTML={createMarkupText(postTitle)} />
                <EventPrice className="text-right col-5" price={price} currency={currency} />
                <EventLocation className="col-7" city={postCity} address={location} />
                <EventDate className="text-right col-5" date={dateOf} />
              </div>
            </div>
          </div>
        </NavLink>
      </li>;
    });

    return (
      <div className="detail-interesting">
        <h4>{maybeInteresting}</h4>
        <ul>
          {samePosts}
        </ul>
      </div>
    );
  }
}

DetailInteresting.defaultProps = {
  noPhotoUrl: imageUrlRecources.noPhoto,
  maybeInteresting: detailRecources.maybeInteresting,
};

export default DetailInteresting;
