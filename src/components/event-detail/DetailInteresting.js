import React, { PureComponent, Fragment } from 'react';
import DetailInterestingEvent from './views/DetailInterestingEvent';
import DetailInterestingView from './views/DetailInterestingView';
import store from '../../store';
import { request } from '../../api';
import { getValueFromParams } from '../../helper';
import { categories } from '../../fixtures';
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
    const similarEvents = posts.map((similarEvent) => {
      const {
        id: eventID,
        categories: postCategories = ['it'],
        title: { rendered: eventTitle },
        acf: {
          picture,
          picture_url,
          price : eventPrice = '',
          currency : eventCurrency = '',
          cities: eventCity,
          location: eventLocation,
          dateOf: eventDate,
        },
      } = similarEvent;
      const eventCategory = getValueFromParams(categories, postCategories[0], 'id', 'url');
      const eventUrl = `/events/${eventCity}/${eventCategory}/${eventID}`;
      const { noPhotoUrl } = this.props;
      const eventImgUrl = picture || picture_url || noPhotoUrl;

      return <DetailInterestingEvent
               key={eventID}
               eventID={eventID}
               eventUrl={eventUrl}
               eventImgUrl={eventImgUrl}
               eventTitle={eventTitle}
               eventPrice={eventPrice}
               eventCurrency={eventCurrency}
               eventCity={eventCity}
               eventLocation={eventLocation}
               eventDate={eventDate}
      />
    });

    return <DetailInterestingView similarEvents={similarEvents} />;
  }
}

DetailInteresting.defaultProps = {
  noPhotoUrl: imageUrlRecources.noPhoto,
};

export default DetailInteresting;
