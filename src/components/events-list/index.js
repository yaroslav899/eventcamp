import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import store from '../../store';
import { request } from '../../api';
import Title from './Title';
import Filters from '../event-filters';
import Pagination from './PaginationContainter';
import LastPosts from '../global/LastPosts';
import EventList from './EventList';
import Adventages from '../global/Adventages';
import { categories, cities, free } from '../../fixtures';
import { listRecources, imageUrlRecources, globalRecources } from '../../recources';
import { getValueFromParams, updateFilterStore } from '../../helper';

class ListPage extends PureComponent {
  componentDidMount() {
    const initialParams = this.props.match.params;
    updateFilterStore(initialParams);
    request.getListPosts(initialParams).then((posts) => {
      store.dispatch({
        type: 'UPDATE_EVENT_LIST',
        list: posts,
      });
    });
  }

  render() {
    const { posts } = this.props;
    let eventsElement = !posts.length ? listRecources.emptyList : posts.map((event) => <li key={event.id} className='events__item events-item'>
      <NavLink to={`/events/${getValueFromParams(cities, event.acf.cities, 'name', 'url')}/${getValueFromParams(categories, event.categories[0], 'id', 'url')}/${event.id}`} className="events-item__link">
        <EventList event={event} />
      </NavLink>
    </li>);
    return (
      <div className="container events">
        <Adventages />
        <div className="row">
          <div className="col-9">
            <Title />
            <ul className="events__list">
              {eventsElement}
            </ul>
          </div>
          <div className="col-3">
            <Filters />
            <LastPosts />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Pagination />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function (store) {
  return {
    posts: store.filterState.list,
  }
};

export default connect(mapStateToProps)(ListPage);