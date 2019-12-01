import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { updateActivePage } from '../../redux/actions/paginationActions';
import { updateEventList } from '../../redux/actions/filterActions';
import Pagination from '../global/Pagination';
import { request } from '../../api';
import { scrollToTop } from '../../helper/scroll';

class PaginationContainer extends PureComponent {
  state = {
    updatedTotalPages: [],
    lastPage: null,
  };

  componentDidMount() {
    const { totalPages, activePageNumber, updateActivePage } = this.props;

    updateActivePage(activePageNumber);

    return this.updatePagination(totalPages, +activePageNumber);
  }

  componentDidUpdate(prevProps, prevState, totalPages) {
    if (totalPages !== null) {
      const { firstPage } = prevProps;

      return this.updatePagination(totalPages, firstPage);
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

  updatePagination = (totalPages, activePage) => {
    const updatedTotalPages = this.getTotalPages(totalPages, activePage);

    this.setState({
      updatedTotalPages,
      lastPage: [...updatedTotalPages].pop(),
    });

    return true;
  }

  handlePaginationClick = (page) => {
    return this.updateEventList({ page });
  }

  goToPreviousPage = () => {
    const { firstPage, activePageNumber } = this.props;

    if (+activePageNumber === firstPage) {
      return false;
    }

    const page = activePageNumber - 1;

    return this.updateEventList({ page });
  }

  goToNextPage = () => {
    const { totalPages, activePageNumber } = this.props;

    if (+activePageNumber === totalPages.length) {
      return false;
    }

    const page = +activePageNumber + 1;

    return this.updateEventList({ page });
  }


  updateEventList = (initialParams) => {
    const { totalPages, maxPageNumber, updateActivePage, updateEvents } = this.props;
    const activePage = +initialParams.page;
    const updatedTotalPages = this.getTotalPages(totalPages, activePage);

    updateActivePage(initialParams.page);

    if ((updatedTotalPages.length < maxPageNumber) && !(totalPages.length < maxPageNumber)) {
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
      lastPage: [...updatedTotalPages].pop(),
      updatedTotalPages,
    });

    request.getListPosts(initialParams).then((posts) => {
      updateEvents(posts);
    });

    scrollToTop();
  }

  getTotalPages = (totalPages, activePage) => {
    const { maxPageNumber, startNumberRedrawPagination } = this.props;
    const isCountPagesLessTotal = totalPages.length < maxPageNumber;
    const startNumberSplice = isCountPagesLessTotal || (activePage < startNumberRedrawPagination) ? 0 : (activePage - 1);

    return [...totalPages].splice(startNumberSplice, maxPageNumber);
  }

  render() {
    const { updatedTotalPages, lastPage } = this.state;
    const { totalPages, firstPage, activePageNumber } = this.props;
    const totalPagesLength = totalPages.length;
    const isShowDotsBefore = ([...updatedTotalPages].shift() !== [...totalPages].shift());
    const isShowDotsAfter = (lastPage < totalPagesLength);
    const pageNavigation = updatedTotalPages.map((pageNumber) => (
      <Pagination
        pageNumber={pageNumber}
        key={pageNumber}
        classNameItem={`events-pagination__item events-pagination-item ${(+activePageNumber === +pageNumber) ? ' active' : ''}`}
        handler={this.handlePaginationClick}
      />
    ));

    if (!totalPagesLength || totalPages.length === 1) {
      return <Fragment />;
    }

    return (
      <Fragment>
        <button type="button" className="events-pagination__navButton events-pagination__prev-button" onClick={this.goToPreviousPage} />

        <ul className="events__pagination events-pagination ">
          {!updatedTotalPages.includes(firstPage)
            && <Pagination
              pageNumber={firstPage}
              key={firstPage}
              classNameItem={`events-pagination__item events-pagination-item ${(+activePageNumber === +firstPage) ? ' active' : ''}`}
              handler={this.handlePaginationClick}
            />
          }
          {isShowDotsBefore
            && <li className="events-pagination__item events-pagination-item">...</li>
          }
          {pageNavigation}
          {isShowDotsAfter
            && <li className="events-pagination__item events-pagination-item">...</li>
          }
          {!updatedTotalPages.includes(totalPagesLength)
            && <Pagination
              pageNumber={totalPagesLength}
              key={totalPagesLength}
              classNameItem={`events-pagination__item events-pagination-item ${(+activePageNumber === +totalPagesLength) ? ' active' : ''}`}
              handler={this.handlePaginationClick}
            />
          }
        </ul>

        <button type="button" className="events-pagination__navButton events-pagination__next-button" onClick={this.goToNextPage} />
      </Fragment>
    );
  }
}

function mapTotalPagesToProps(store) {
  return {
    totalPages: store.totalPages.count,
    activePageNumber: store.totalPages.activePageNumber,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateEvents: posts => dispatch(updateEventList(posts)),
    updateActivePage: activePageNumber => dispatch(updateActivePage(activePageNumber)),
  };
}

PaginationContainer.defaultProps = {
  firstPage: 1,
  maxPageNumber: 10,
  startNumberRedrawPagination: 6,
};

export default connect(mapTotalPagesToProps, mapDispatchToProps)(PaginationContainer);
