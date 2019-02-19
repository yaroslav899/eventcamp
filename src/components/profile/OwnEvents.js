import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import EventList from '../events-list/EventList';
import { request } from '../../api';
import store from '../../store';

class OwnEvents extends PureComponent {
  componentDidMount() {
    request.getAuthorPosts({ author: this.props.userData.id }).then(posts => {
      store.dispatch({
        type: 'UPDATE_USER_POSTS',
        listPosts: posts,
      });
    });
  }

  render() {
    const {
      props: {
        posts,
      },
    } = this;

    const userPosts = !posts.length ? '' : posts.map(article => <li key={article.id} className="own-events__item own-events-item">
      <EventList
        event={article}
        imgWrapClass="d-none"
        descrWrapClass="col-9"
        titleClass="own-events-item__title"
        descrClass="d-none"
        actionWrapClass="col-3 text-right"
        priceClass="d-none"
        placeClass="d-none"
        dateClass="d-none"
        ctaWrapClass="own-events-item__action"
        ctaClass="own-events-item__button"
        isOwner={true}
      />
    </li>);
    return (
      <ul className="own-events__list">
        {userPosts}
      </ul>
    )
  }
}

const mapStateToProps = function (store) {
  return {
    posts: store.user.listPosts,
    userData: store.user.userData,
  };
};

export default connect(mapStateToProps)(OwnEvents);
