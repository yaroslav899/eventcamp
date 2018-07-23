import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import store from '../store';
import {request} from '../api';
import moment from 'moment';
import Filters from './filters';
import Pagination from './Pagination';
import LastPosts from './list/LastPosts';
import {NavLink} from 'react-router-dom';
import { categories, cities, free } from '../fixtures';
import { getValueFromParams } from '../helper';

class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title : 'События и конференции'
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(this.props.posts) == JSON.stringify(nextProps.posts)) {
            return false;
        }
        return true;
    }

    componentDidMount(){
        const initialParams = this.props.match.params;
        if ('cities' in initialParams) {
            if (initialParams.cities === 'any') {
                initialParams.cities = '';
            } else {
                let values = cities.filter(item => item.url == initialParams.cities);
                initialParams.cities = values.length ? values[0].id : '';
                store.dispatch({
                    type: 'UPDATE_FILTER_CITY',
                    cities: initialParams.cities
                });
            }
        }
        if ('categories' in initialParams) {
            let values = categories.filter(item => item.url == initialParams.categories);
            initialParams.categories = values.length ? values[0].id : '';
            store.dispatch({
                type: 'UPDATE_FILTER_CATEGORY',
                categories: initialParams.categories
            });
        }
        return request.getListPosts(initialParams).then(posts => {
                store.dispatch({
                    type: 'EVENT_LIST_UPDATE',
                    list: posts
                });
        })
    }

    render() {
        let articleElements;
        if (!this.props.posts.length) {
            articleElements = 'записи отсутствуют';
        } else {
            articleElements = this.props.posts.map(article => <li key={article.id} className='event_list'>
                <NavLink to={`/${'events'}/${getValueFromParams(cities, article.acf.cities, 'name', 'url')}/${getValueFromParams(categories, article.categories[0], 'id', 'url')}/${article.id}`}>
                    <div className="row">
                        <div className="col-3">
                            <img src={article.acf.picture || 'http://board.it-mir.net.ua/wp-content/uploads/2018/05/nophoto.jpg'}
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
                                {free.indexOf(article.acf.price) === -1 ? (article.acf.price + '' + article.acf.currency || '') : 'бесплатно'}
                            </div>
                            <div className="event_list-location">
                                {article.acf.cities} {article.acf.location}
                            </div>
                            <div className="event_list-date">
                                {article.acf.dateOf ? moment(article.acf.dateOf, "YYYY-MM-DD").format("Do MMM YYYY") : ''}
                            </div>
                            <div className="event_list-action">
                                <button className="event_list-actionMore">Подробнее</button>
                            </div>
                        </div>
                    </div>
                </NavLink>
            </li>);
        }
        let categoryTitle = this.props.categories ? getValueFromParams(categories, this.props.categories, 'id', 'name')  + '. ' : '',
            cityTitle = this.props.cities ? ' в городе ' + getValueFromParams(cities, this.props.cities, 'id', 'name') : '';
        document.title = categoryTitle + this.state.title + cityTitle;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-9">
                        <h1>{categoryTitle + this.state.title + cityTitle}</h1>
                        {articleElements}
                    </div>
                    <div className="col-3">
                        <Filters/>
                        <LastPosts/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Pagination/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        posts: store.filterState.list,
        categories : store.filterState.categories,
        cities : store.filterState.cities
    }
};

export default connect(mapStateToProps)(EventList);