import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';
import { request } from '../api';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        };
        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    handlePaginationClick(e) {
        e.preventDefault();
        let initialParams = {
            page : e.target.text
        };
        request.getListPosts(initialParams).then(posts => {
            store.dispatch({
                type: 'EVENT_LIST_UPDATE',
                list: posts
            });
        });
        this.setState({
            activePage: initialParams.page
        });
        window.scrollTo(0, 0)
    }

    render(){
        let activePage = this.state.activePage;
        const pageNavigation = this.props.totalPages.map(pageNumber => <li key={pageNumber} className={(activePage == pageNumber) ? 'active' : ''}>
            <a href="#" onClick={this.handlePaginationClick}>{pageNumber}</a>
        </li>);
        return (
            <div className="event_list-pagination">
                <ul>{pageNavigation}</ul>
            </div>
        )
    }
}

const mapTotalPagesToProps = function(store) {
    return {
        totalPages: store.totalPages.count
    }
};

export default connect(mapTotalPagesToProps)(Pagination);