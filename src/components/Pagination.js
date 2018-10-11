import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { request } from '../api';

class Pagination extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  handlePaginationClick(e) {
    e.preventDefault();
    const initialParams = {
      page: e.target.text,
    };
    request.getListPosts(initialParams).then((posts) => {
      store.dispatch({
        type: 'UPDATE_EVENT_LIST',
        list: posts,
      });
    });
    this.setState({
      activePage: initialParams.page,
    });
    window.scrollTo(0, 0);
  }

  render() {
    const { activePage } = this.state;
    const { totalPages } = this.props;
    const pageNavigation = totalPages.map(pageNumber => (
      <li key={pageNumber} className={`events-pagination__item events-pagination-item ${(+activePage === +pageNumber) ? ' active' : ''}`}>
        <a href="#" className="events-pagination-item__link" onClick={this.handlePaginationClick}>{pageNumber}</a>
      </li>
    ),
    );
    return (
      <ul className="events__pagination events-pagination">{pageNavigation}</ul>
    );
  }
}

const mapTotalPagesToProps = function (store) {
  return {
    totalPages: store.totalPages.count,
  };
};

export default connect(mapTotalPagesToProps)(Pagination);
