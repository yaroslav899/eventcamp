import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { updateUserPosts } from '../../redux/actions/userActions';
import EventView from '../event-global/EventView';
import { request } from '../../api';

class OwnEvents extends PureComponent {
  componentDidMount() {
    const { userProfile: { userID } } = this.props;

    if (userID) {
      return this.loadOwnEvents(userID);
    }

    return false;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      const { userID } = snapshot;

      return this.loadOwnEvents(userID);
    }

    return null;
  }

  getSnapshotBeforeUpdate(prevProps) {
    const { userProfile: prevProfileData } = prevProps;
    const { userProfile: profileData } = this.props;

    if ((prevProfileData.userID !== profileData.userID) && profileData.userID) {
      return profileData;
    }

    return null;
  }

  loadOwnEvents = userID => request.getAuthorPosts({ author: userID })
    .then((posts) => {
      const { dispatch } = this.props;

      dispatch(updateUserPosts(posts));
    });

  render() {
    const { posts } = this.props;
    const userPosts = !posts.length ? '---' : posts.map(article => <li key={article.id} className="own-events__item own-events-item">
      <EventView event={article} isOwner />
    </li>);

    return (
      <ul>
        {userPosts}
      </ul>
    );
  }
}

function mapStateToProps(store) {
  return {
    posts: store.user.listPosts,
    userProfile: store.user.data,
  }
};

export default connect(mapStateToProps)(OwnEvents);
