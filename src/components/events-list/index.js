import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import store from '../../store';
import { request } from '../../api';
import EventList from './EventList';
import ListPageView from './views/ListPageView';
import Loader from '../global/Loader';
import { categories, cities } from '../../fixtures';
import { listRecources, globalRecources } from '../../resources';
import { getValueFromParams, updateFilterStore } from '../../helper';

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
    let eventsElement = null;

    if (!posts.length) {
      return (
        <Loader/>
      )
    }

    if (posts.length === 1 && posts[0].empty) {
      eventsElement = posts[0].empty;
    } else {
      eventsElement = posts.map((event) => {
        let city = getValueFromParams(cities, event.acf.cities, 'name', 'url');
        let category = getValueFromParams(categories, event.categories[0], 'id', 'url');

        return <li key={event.id} className='events__item events-item'>
          <NavLink to={`/events/${city}/${category}/${event.id}`} className="events-item__link">
            <EventList
              event={event}
              imgWrapClass="col-3"
              descrWrapClass="col-6"
              titleClass="events-item__title"
              descrClass="events-item__description"
              actionWrapClass="col-3"
              priceClass="events-item__price"
              placeClass="events-item__location"
              dateClass="events-item__date"
              ctaWrapClass="events-item__action events-item-action"
              ctaClass="events-item-action__button"
              isOwner={false}
            />
          </NavLink>
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