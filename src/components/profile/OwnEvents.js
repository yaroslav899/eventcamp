import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import EventView from '../global/EventView';
import { request } from '../../api';
import store from '../../store';

class OwnEvents extends PureComponent {
  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { user: prevUserData } = prevProps;
    const { user: userData } = this.props;
    if (Object.keys(prevUserData).length < Object.keys(userData).length) {
      return userData;
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
    return request.getAuthorPosts({ author: userID }).then((posts) => {
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
