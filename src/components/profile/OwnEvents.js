import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import EventList from '../events-list/EventList';
import { request } from '../../api';
import store from '../../store';

class OwnEvents extends PureComponent {
  componentDidMount() {
    const { posts } = this.props;

    if (posts.length) {
      return true;
    }

    return request.getUserID().then((data) => {
      if (!data) {
        return false;
      }

      this.loadOwnEvents(data);
    });
  }

  loadOwnEvents(userID) {
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
      <EventList
        event={article}
        imgWrapClass="d-none"
        descrWrapClass="col-9"
        actionWrapClass="col-3 text-right"
        isOwner={true}
      />
    </li>);

    return (
      <ul>
        {userPosts}
      </ul>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    posts: store.user.listPosts,
  };
};

export default connect(mapStateToProps)(OwnEvents);
