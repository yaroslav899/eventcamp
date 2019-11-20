import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { request } from '../../api';
import EventList from './EventList';
import ListPageView from './views/ListPageView';
import Loader from '../global/Loader';
import { updateFilterStore } from '../../helper';
import { globalRecources } from '../../resources/global';

class ListPage extends PureComponent {
  componentDidMount() {
    const { noFilterResultMsg, match } = this.props;
    const { params: initialParams } = match;

    store.dispatch({
      type: 'UPDATE_EVENT_LIST',
      list: [],
    });

    updateFilterStore(initialParams);

    return request.getListPosts(initialParams).then((posts) => {
      if (!posts.length) {
        posts.push({ empty: noFilterResultMsg });
      }

      store.dispatch({
        type: 'UPDATE_EVENT_LIST',
        list: posts,
      });

      return true;
    });
  }

  render() {
    const { posts } = this.props;

    if (!posts.length) {
      return <Loader />;
    }

    let eventsElement = null;

    if (posts.length === 1 && posts[0].empty) {
      eventsElement = posts[0].empty;
    } else {
      eventsElement = posts.map((event) => {
        return <li key={event.id} className="events__item events-item">
          <EventList
            event={event}
            imgWrapClass="col-12 col-lg-3 d-md-none d-lg-block"
            descrWrapClass="col-12 col-lg-6 col-md-7"
            actionWrapClass="col-12 col-lg-3 col-md-5"
            isOwner={false}
          />
        </li>;
      });
    }

    return <ListPageView eventsElement={eventsElement} />;
  }
}

const mapStateToProps = storeData => {
  return { posts: storeData.filterState.list};
};

ListPage.defaultProps = { noFilterResultMsg: globalRecources.noFilterResult };

export default connect(mapStateToProps)(ListPage);
