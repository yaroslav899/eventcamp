import React, { PureComponent, Fragment } from 'react';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../store';
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
    params.page='1';

    return request.getListPosts(params)
      .then((posts) => {
        if (!posts.length) {
          posts.push({ empty: globalRecources.noFilterResult });
        }

        store.dispatch({
          type: 'UPDATE_EVENT_LIST',
          list: posts,
        });

        store.dispatch({
          type: 'UPDATE_FILTER_CATEGORY',
          categories: params['categories'],
        });

        return params;
      });
  };

  render() {
    const { categories: catFilter } = this.props;

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
          value={catFilter}
          onChange={this.changeCategory}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (storeData) => {
  return { categories: storeData.filterState.categories };
};

export default withRouter(connect(mapStateToProps)(CategoryField));
