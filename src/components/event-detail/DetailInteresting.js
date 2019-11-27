import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import InterestingEventView from './views/InterestingEventView';
import InterestingListView from './views/InterestingListView';
import { updateDetailPost } from '../../redux/actions/postActions';
import { request } from '../../api';
import { getValueFromParams } from '../../helper';
import { categories } from '../../fixtures';
import { imageUrlRecources } from '../../resources/url';

class DetailInteresting extends PureComponent {
  _isMounted = false;

  state = { posts: [] };

  componentDidMount() {
    const { data, dispatch } = this.props;

    this._isMounted = true;

    dispatch(updateDetailPost(data));

    return request.getInterestingData(data, true).then((posts) => {
      if (this._isMounted) {
        if (!posts || !posts.length) {
          return request.getInterestingData(data, false).then((newPosts) => {
            this.updateDetailInterestingPosts(newPosts, data);
          });
        }

        return this.updateDetailInterestingPosts(posts, data);
      }

      return true;
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateDetailInterestingPosts = (posts, data) => {
    if (!posts) return false;

    this.setState({ posts: posts.filter(post => post.id !== data.id) });

    return true;
  }

  render() {
    const { posts } = this.state;

    if (!posts.length) return <Fragment />;

    const events = posts.map((similarEvent) => {
      const {
        id: eventID,
        categories: postCategories = ['it'],
        title: { rendered: eventTitle },
        acf: {
          picture,
          picture_url: pictureUrl,
          price: eventPrice = '',
          currency: eventCurrency = '',
          cities: eventCity,
          location: eventLocation,
          dateOf: eventDate,
        },
      } = similarEvent;
      const eventCategory = getValueFromParams(categories, postCategories[0], 'id', 'url');
      const eventUrl = `/events/${eventCity}/${eventCategory}/${eventID}`;
      const { noPhotoUrl } = this.props;
      const eventImgUrl = picture || pictureUrl || noPhotoUrl;

      return <InterestingEventView
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

    return <InterestingListView events={events} />;
  }
}

DetailInteresting.defaultProps = { noPhotoUrl: imageUrlRecources.noPhoto };

export default connect()(DetailInteresting);
