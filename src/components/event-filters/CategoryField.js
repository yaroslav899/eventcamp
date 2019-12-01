import React, { PureComponent, Fragment } from 'react';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateEventList, updateFilterCategory } from '../../redux/actions/filterActions';
import { updateActivePage } from '../../redux/actions/paginationActions';
import { request } from '../../api';
import { categories } from '../../fixtures';
import { filterRecources } from '../../resources';
import { globalRecources } from '../../resources/global';
import { getHistoryUrl } from '../../helper';

class CategoryField extends PureComponent {
  changeCategory = (selection) => {
    const { history } = this.props;
    const url = getHistoryUrl('categories', selection, '');

    this.changeSelection('categories', selection);

    history.push(url);
  };

  changeSelection = (type, selection) => {
    const params = !selection ? { [type]: '' } : { [selection.type]: selection ? selection.value : '' };
    const { defaultPage, updateEvents, updateCategory, updateActivePage } = this.props;

    updateActivePage(defaultPage);

    return request.getListPosts(params)
      .then((posts) => {
        if (!posts.length) {
          posts.push({ empty: globalRecources.noFilterResult });
        }

        updateEvents(posts);
        updateCategory(params.categories);

        return params;
      });
  };

  render() {
    const { categories: categoryValue } = this.props;

    return (
      <Fragment>
        <p>{filterRecources.category}</p>
        <Select
          name="form-field-category"
          label="categories"
          options={categories.map(category => ({
            label: category.name,
            value: category.id,
            type: 'categories',
          }))}
          value={categoryValue}
          onChange={this.changeCategory}
        />
      </Fragment>
    );
  }
}

function mapStateToProps(store) {
  return { categories: store.filterState.categories };
}

function mapDispatchToProps(dispatch) {
  return {
    updateEvents: posts => dispatch(updateEventList(posts)),
    updateCategory: categories => dispatch(updateFilterCategory(categories)),
    updateActivePage: page => dispatch(updateActivePage(page)),
  };
}

CategoryField.defaultProps = { defaultPage: '1' };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryField));
