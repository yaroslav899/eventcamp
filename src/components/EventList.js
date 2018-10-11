import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import store from '../store';
import { request } from '../api';
import Title from './list/Title';
import Filters from './filters';
import Pagination from './Pagination';
import LastPosts from './list/LastPosts';
import Adventages from './global/Adventages';
import { categories, cities, free } from '../fixtures';
import { listRecources, imageUrlRecources, globalRecources } from '../recources';
import { getValueFromParams, updateFilterStore } from '../helper';

class EventList extends PureComponent {
  componentDidMount() {
    const initialParams = this.props.match.params;
    updateFilterStore(initialParams);
    request.getListPosts(initialParams).then(posts => {
      store.dispatch({
        type: 'UPDATE_EVENT_LIST',
        list: posts,
      });
    });
  }

  render() {
    const posts = this.props.posts;
    let articleElements = !posts.length ? listRecources.emptyList : posts.map(article => <li key={article.id} className='events__item events-item'>
      <NavLink to={`/events/${getValueFromParams(cities, article.acf.cities, 'name', 'url')}/${getValueFromParams(categories, article.categories[0], 'id', 'url')}/${article.id}`} className="events-item__link">
        <div className="row">
          <div className="col-3">
            <img src={article.acf.picture || imageUrlRecources.noPhoto}
                  alt={article.title.rendered}
                  className="events-item__img" />
          </div>
          <div className="col-6">
            <div className="events-item__title" dangerouslySetInnerHTML={{ __html: article.title.rendered }} />
            <div className="events-item__description" dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }} />
            <div className="events-item__tags events-item-tags">{article.acf.tags ?
              article.acf.tags.split(',').map(tag => <span key={tag} className="events-item-tags__tag">{tag}</span>) : ''}
            </div>
          </div>
          <div className="col-3">
            <div className="events-item__price">
              {free.indexOf(article.acf.price) === -1 ? (article.acf.price + ' ' + article.acf.currency || '') : globalRecources.free}
            </div>
            <div className="events-item__location">
              {article.acf.cities} {article.acf.location}
            </div>
            <div className="events-item__date">
              {article.acf.dateOf ? moment(article.acf.dateOf, "YYYY-MM-DD").format("Do MMM YYYY") : ''}
            </div>
            <div className="events-item__action events-item-action">
              <button className="events-item-action__button">{globalRecources.moreInfo}</button>
            </div>
          </div>
        </div>
      </NavLink>
    </li>);
    return (
      <div className="container events">
        <Adventages />
        <div className="row">
          <div className="col-9">
            <Title />
            <ul className="events__list">
              {articleElements}
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

const mapStateToProps = function(store) {
    return {
        posts: store.filterState.list,
    }
};

export default connect(mapStateToProps)(EventList);