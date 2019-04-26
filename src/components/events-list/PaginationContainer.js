import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import Pagination from '../global/Pagination';
import { request } from '../../api';
import { scrollToTop } from '../../helper/scroll';

class PaginationContainer extends PureComponent {
  state = {
    updatedTotalPages: [],
    activePage: 1,
    maxPageNumber: 10,
    lastPage: null,
    firstPage: 1,
  };

  componentDidMount() {
    const { activePage, maxPageNumber } = this.state;
    const { totalPages } = this.props;
    const updatedTotalPages = [...totalPages].splice(activePage-1, maxPageNumber);

    this.setState({
      updatedTotalPages: updatedTotalPages,
      lastPage: [...updatedTotalPages].pop(),
    });
  }

  handlePaginationClick = (pageNumber) => {
    const initialParams = {
      page: pageNumber,
    };

    this.updateEventList(initialParams);
  }

  goToPreviousPage = () => {
    const { activePage } = this.state;

    if (activePage === 1) {
      return false;
    }

    const initialParams = {
      page: activePage - 1,
    };

    this.updateEventList(initialParams);
  }

  goToNextPage = () => {
    const { activePage } = this.state;
    const { totalPages } = this.props;

    if (activePage === totalPages.length) {
      return false;
    }

    const initialParams = {
      page: +activePage + 1,
    };

    this.updateEventList(initialParams);
  }

  updateEventList = (initialParams) => {
    const { maxPageNumber } = this.state;
    const { totalPages } = this.props;
    const activePage = initialParams.page;
    const updatedTotalPages = [...totalPages].splice(activePage-1, maxPageNumber);

    if (updatedTotalPages.length >= maxPageNumber ) {
      this.setState({
        updatedTotalPages: updatedTotalPages,
      });
    }

    request.getListPosts(initialParams).then((posts) => {
      store.dispatch({
        type: 'UPDATE_EVENT_LIST',
        list: posts,
      });
    });

    this.setState({
      activePage: activePage,
      lastPage: [...updatedTotalPages].pop(),
    });

    scrollToTop();
  }

  render() {
    const { updatedTotalPages, activePage, lastPage, firstPage, maxPageNumber } = this.state;
    const { totalPages } = this.props;
    const isShowDotsBefore = ([...updatedTotalPages].shift() !== [...totalPages].shift());
    const isShowDotsAfter = (lastPage < totalPages.length);
    const pageNavigation = updatedTotalPages.map((pageNumber) => (
      <Pagination
        pageNumber={pageNumber}
        key={pageNumber}
        classNameItem={`events-pagination__item events-pagination-item ${(+activePage === +pageNumber) ? ' active' : ''}`}
        handler={this.handlePaginationClick}
      />
    ));

    return (
      <Fragment>
        <button className="events-pagination__navButton events-pagination__prev-button" onClick={this.goToPreviousPage}/>
        <ul className="events__pagination events-pagination ">
          {isShowDotsBefore &&
            <li className="events-pagination__item events-pagination-item">...</li>
          }

          {pageNavigation}

          {isShowDotsAfter &&
            <li className="events-pagination__item events-pagination-item">...</li>
          }
        </ul>
        <button className="events-pagination__navButton events-pagination__next-button" onClick={this.goToNextPage}/>
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
