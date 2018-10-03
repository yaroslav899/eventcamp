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
import { getValueFromParams } from '../helper';

class EventList extends PureComponent {
  componentDidMount() {
    const initialParams = this.props.match.params;
    if ('cities' in initialParams) {
      if (initialParams.cities === 'any') {
        initialParams.cities = '';
      } else {
        let value = cities.find(item => item.url == initialParams.cities);
        initialParams.cities = value && value.id || '';
        store.dispatch({
          type: 'UPDATE_FILTER_CITY',
          cities: initialParams.cities,
        });
      }
    }
    if ('categories' in initialParams) {
      let value = categories.find(item => item.url == initialParams.categories);
      initialParams.categories = value && value.id || '';
      store.dispatch({
        type: 'UPDATE_FILTER_CATEGORY',
        categories: initialParams.categories,
      });
    }
    return request.getListPosts(initialParams).then(posts => {
      store.dispatch({
        type: 'EVENT_LIST_UPDATE',
        list: posts,
      });
    });
  }

  render() {
    const posts = this.props.posts;
    let articleElements = !posts.length ? listRecources.emptyList : posts.map(article => <li key={article.id} className='event_list'>
      <NavLink to={`/events/${getValueFromParams(cities, article.acf.cities, 'name', 'url')}/${getValueFromParams(categories, article.categories[0], 'id', 'url')}/${article.id}`}>
        <div className="row">
          <div className="col-3">
            <img src={article.acf.picture || imageUrlRecources.noPhoto}
                 className="event_list-img" />
          </div>
          <div className="col-6">
            <div className="event_list-title" dangerouslySetInnerHTML={{ __html: article.title.rendered }}></div>
            <div className="event_list-description" dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }}></div>
            <div className="event_list-tags">{article.acf.tags ?
              article.acf.tags.split(',').map(tag =>
            <span className="tagOpt" key={tag}>{tag}</span>
            ) : ''}</div>
          </div>
                        <div className="col-3">
                            <div className="event_list-price">
                                {free.indexOf(article.acf.price) === -1 ? (article.acf.price + '' + article.acf.currency || '') : globalRecources.free}
                            </div>
                            <div className="event_list-location">
                                {article.acf.cities} {article.acf.location}
                            </div>
                            <div className="event_list-date">
                                {article.acf.dateOf ? moment(article.acf.dateOf, "YYYY-MM-DD").format("Do MMM YYYY") : ''}
                            </div>
                            <div className="event_list-action">
                                <button className="event_list-actionMore">{globalRecources.moreInfo}</button>
                            </div>
                        </div>
                    </div>
                </NavLink>
            </li>);
        return (
            <div className="container">
                <Adventages />
                <div className="row">
                    <div className="col-9">
                        <Title />
                        {articleElements}
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
        posts: store.filterState.list
    }
};

export default connect(mapStateToProps)(EventList);