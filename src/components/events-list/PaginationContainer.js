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
    lastPage: null,
  };

  componentDidMount() {
    const { activePage } = this.state;
    const { totalPages } = this.props;

    return this.updatePaginationPages(totalPages, activePage);
  }

  componentDidUpdate(prevProps, prevState, totalPages) {
    if (totalPages !== null) {
      const { firstPage } = prevProps;
      this.setState({ activePage: firstPage });

      return this.updatePaginationPages(totalPages, firstPage);
    }

    return null;
  }

  getSnapshotBeforeUpdate(prevProps) {
    const { totalPages: prevTotalPages } = prevProps;
    const { totalPages } = this.props;

    if (prevTotalPages.length !== totalPages.length) {
      return totalPages;
    }

    return null;
  }

  updatePaginationPages = (totalPages, activePage) => {
    const { maxPageNumber } = this.props;
    const updatedTotalPages = [...totalPages].splice(activePage - 1, maxPageNumber);

    this.setState({
      updatedTotalPages,
      lastPage: [...updatedTotalPages].pop(),
    });

    return true;
  }

  handlePaginationClick = (page) => {
    const initialParams = { page };

    this.updateEventList(initialParams);
  }

  goToFirstPage = () => {
    const { activePage } = this.state;
    const { firstPage } = this.props;

    if (+activePage === firstPage) {
      return false;
    }

    const page = firstPage;

    return this.updateEventList({ page });
  }

  goToPreviousPage = () => {
    const { activePage } = this.state;
    const { firstPage } = this.props;

    if (+activePage === firstPage) {
      return false;
    }

    const page = activePage - 1;

    return this.updateEventList({ page });
  }

  goToNextPage = () => {
    const { activePage } = this.state;
    const { totalPages } = this.props;

    if (+activePage === totalPages.length) {
      return false;
    }

    const page = +activePage + 1;

    return this.updateEventList({ page });
  }

  goToLastPage = () => {
    const { activePage } = this.state;
    const { totalPages } = this.props;

    if (+activePage === totalPages.length) {
      return false;
    }

    const page = totalPages.length;

    return this.updateEventList({ page });
  }

  updateEventList = (initialParams) => {
    const { totalPages, maxPageNumber, startNumberRedrawPagination, rangeNumbers } = this.props;
    const activePage = +initialParams.page;
    const isCountPagesLessTotal = totalPages.length < maxPageNumber;
    let startNumberSplice = isCountPagesLessTotal || (activePage < startNumberRedrawPagination) ? 0 : (activePage - 1);
    startNumberSplice = (startNumberSplice && activePage > rangeNumbers) ? startNumberSplice - rangeNumbers : startNumberSplice;
    const updatedTotalPages = [...totalPages].splice(startNumberSplice, maxPageNumber);

    if ((updatedTotalPages.length < maxPageNumber) && !isCountPagesLessTotal) {
      let prevPage = activePage - 1;

      for (let i = 0; i < maxPageNumber; i++) {
        updatedTotalPages.unshift(prevPage);
        prevPage -= 1;

        if (updatedTotalPages.length === maxPageNumber) {
          break;
        }
      }
    }

    this.setState({
      activePage,
      lastPage: [...updatedTotalPages].pop(),
      updatedTotalPages,
    });

    request.getListPosts(initialParams).then((posts) => {
      store.dispatch({
        type: 'UPDATE_EVENT_LIST',
        list: posts,
      });
    });

    scrollToTop();
  }

  render() {
    const { updatedTotalPages, activePage, lastPage } = this.state;
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

    if (!totalPages.length) {
      return <Fragment />;
    }

    return (
      <Fragment>
        <button type="button" className="events-pagination__navButton events-pagination__firstpage-button" onClick={this.goToFirstPage} />
        <button type="button" className="events-pagination__navButton events-pagination__prev-button" onClick={this.goToPreviousPage} />

        <ul className="events__pagination events-pagination ">
          {isShowDotsBefore
            && <li className="events-pagination__item events-pagination-item">...</li>
          }
          {pageNavigation}
          {isShowDotsAfter
            && <li className="events-pagination__item events-pagination-item">...</li>
          }
        </ul>
        <button type="button" className="events-pagination__navButton events-pagination__next-button" onClick={this.goToNextPage} />
        <button type="button" className="events-pagination__navButton events-pagination__lastpage-button" onClick={this.goToLastPage} />
      </Fragment>
    );
  }
}

const mapTotalPagesToProps = storeData => {
  return { totalPages: storeData.totalPages.count };
};

PaginationContainer.defaultProps = {
  firstPage: 1,
  maxPageNumber: 10,
  startNumberRedrawPagination: 6,
  rangeNumbers: 3,
};

export default connect(mapTotalPagesToProps)(PaginationContainer);
