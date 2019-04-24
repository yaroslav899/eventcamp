import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import Pagination from '../global/Pagination';
import { request } from '../../api';
import { scrollToTop } from '../../helper/scroll';

class PaginationContainer extends PureComponent {
  state = {
    activePage: 1,
    maxPageNumber: 10,
    lastPage: 10,
  };

  handlePaginationClick = (event) => {
    event.preventDefault();

    scrollToTop();

    // ToDo updated approach without target.text
    const initialParams = {
      page: event.target.text,
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
  }

  goToPreviousPage = () => {
    const { activePage } = this.state;

    if (activePage === 1) {
      return false;
    }

    const initialParams = {
      page: activePage - 1,
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

    scrollToTop();

  }

  goToNextPage = () => {
    const { activePage } = this.state;
    const { totalPages } = this.props;

    if (activePage === totalPages.length) {
      return false;
    }

    const initialParams = {
      page: activePage + 1,
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

    scrollToTop();
  }

  render() {
    const { activePage } = this.state;
    const { totalPages } = this.props;
    const pageNavigation = totalPages.map((pageNumber) => (
      <Pagination
        pageNumber={pageNumber}
        key={pageNumber}
        classNameItem={`events-pagination__item events-pagination-item ${(+activePage === +pageNumber) ? ' active' : ''}`}
        classNameLink='events-pagination-item__link'
        handler={this.handlePaginationClick}
      />
    ));

    return (
      <Fragment>
        <button className="events-pagination__navButton" onClick={this.goToPreviousPage}>prev page</button>
        <ul className="events__pagination events-pagination ">
          {pageNavigation}
        </ul>
        <button className="events-pagination__navButton" onClick={this.goToNextPage}>next page</button>
      </Fragment>
    );
  }
}

const mapTotalPagesToProps = function (store) {
  return {
    totalPages: store.totalPages.count,
  };
};

export default connect(mapTotalPagesToProps)(PaginationContainer);
