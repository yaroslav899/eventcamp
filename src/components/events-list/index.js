import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { request } from '../../api';
import EventList from './EventList';
import ListPageView from './views/ListPageView';
import Loader from '../global/Loader';
import { globalRecources } from '../../resources';
import { updateFilterStore } from '../../helper';

class ListPage extends Component {
  componentDidMount() {
    const initialParams = this.props.match.params;

    store.dispatch({
      type: 'UPDATE_EVENT_LIST',
      list: [],
    });

    updateFilterStore(initialParams);

    request.getListPosts(initialParams).then((posts) => {
      if (!posts.length) {
        posts.push({
          empty: globalRecources.noFilterResult
        });
      }

      store.dispatch({
        type: 'UPDATE_EVENT_LIST',
        list: posts,
      });
    });

  }

  render() {
    const { posts } = this.props;

    if (!posts.length) {
      return (
        <Loader/>
      )
    }

    let eventsElement = null;

    if (posts.length === 1 && posts[0].empty) {
      eventsElement = posts[0].empty;
    } else {
      eventsElement = posts.map((event) => {
        return <li key={event.id} className='events__item events-item'>
            <EventList
              event={event}
              imgWrapClass="col-3"
              descrWrapClass="col-6"
              actionWrapClass="col-3"
              isOwner={false}
            />
        </li>
      });
    }

    return (
      <ListPageView eventsElement={eventsElement} />
    )
  }
}

const mapStateToProps = function (store) {
  return {
    posts: store.filterState.list,
  }
};

export default connect(mapStateToProps)(ListPage);