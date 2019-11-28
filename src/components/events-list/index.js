import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { updateEventList } from '../../redux/actions/filterActions';
import { request } from '../../api';
import EventList from './EventList';
import ListPageView from './views/ListPageView';
import Loader from '../global/Loader';
import { updateFilterStore } from '../../helper';
import { globalRecources } from '../../resources/global';

class ListPage extends PureComponent {
  componentDidMount() {
    const { noFilterResultMsg, match, updateEventList } = this.props;
    const { params: initialParams } = match;

    updateEventList([]);
    updateFilterStore(initialParams);

    return request.getListPosts(initialParams).then((posts) => {
      if (!posts.length) {
        posts.push({ empty: noFilterResultMsg });
      }

      updateEventList(posts);

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
  return { posts: storeData.filterState.list };
};

const mapDispatchToProps = dispatch => {
  return { updateEventList: posts => dispatch(updateEventList(posts)) };
};

ListPage.defaultProps = { noFilterResultMsg: globalRecources.noFilterResult };

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
