import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import EventView from '../event-global/EventView';
import { request } from '../../api';
import store from '../../store';

class OwnEvents extends PureComponent {
  componentDidMount() {
    const { profile: { userID }, posts } = this.props;
    if (userID && !posts.length) {
        return this.loadOwnEvents(userID);
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { profile: prevProfileData } = prevProps;
    const { profile: profileData } = this.props;
    if (Object.keys(prevProfileData).length < Object.keys(profileData).length) {
      return profileData;
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      const { userID } = snapshot;

      return this.loadOwnEvents(userID);
    }
  }

  loadOwnEvents = (userID) => {
    return request.getAuthorPosts({ author: userID })
      .then((posts) => {
        store.dispatch({
          type: 'UPDATE_USER_POSTS',
          listPosts: posts,
        });
      });
  }

  render() {
    const { posts } = this.props;
    const userPosts = !posts.length ? '---' : posts.map(article => <li key={article.id} className="own-events__item own-events-item">
      <EventView event={article} isOwner={true} />
    </li>);

    return (
      <ul>
        {userPosts}
      </ul>
    );
  }
}

const mapStateToProps = (storeData) => {
  return {
    posts: storeData.user.listPosts,
  };
};

export default connect(mapStateToProps)(OwnEvents);
