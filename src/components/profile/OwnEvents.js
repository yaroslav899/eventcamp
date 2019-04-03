import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import EventList from '../events-list/EventList';
import { request } from '../../api';
import store from '../../store';
import { getUserData } from '../../helper';

class OwnEvents extends PureComponent {
  componentDidMount() {
    // ToDo change approach
    new Promise((resolve) => {
    	request.getUserID().then(response => {

    	})

      const requestUserData = getUserData();
      resolve(requestUserData);
    }).then((data) => {
    	if (!data) {
    		return;
    	}

      request.getAuthorPosts({ author: data }).then(posts => {
        store.dispatch({
          type: 'UPDATE_USER_POSTS',
          listPosts: posts,
        });
      });
    });
  }

  render() {
    const { posts } = this.props;
    const userPosts = !posts.length ? 'Событий на данный момент нет' : posts.map(article => <li key={article.id} className="own-events__item own-events-item">
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
    )
  }
}

const mapStateToProps = function (store) {
  return {
    posts: store.user.listPosts,
  };
};

export default connect(mapStateToProps)(OwnEvents);
