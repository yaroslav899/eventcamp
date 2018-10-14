import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import Pagination from '../global/Pagination';
import { request } from '../../api';

class PaginationContainter extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      activePage: 1,
    };
  }

  handlePaginationClick = (event) => {
    event.preventDefault();
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
    window.scrollTo(0, 0);
  }

  render() {
    const { activePage } = this.state;
    const { totalPages } = this.props;
    const pageNavigation = totalPages.map((pageNumber, index) => (
      <Pagination pageNumber={pageNumber}
                  key={index}
                  classNameItem={`events-pagination__item events-pagination-item ${(+activePage === +pageNumber) ? ' active' : ''}`}
                  classNameLink='events-pagination-item__link'
                  handler={this.handlePaginationClick}/>
      )
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

export default connect(mapTotalPagesToProps)(PaginationContainter);
