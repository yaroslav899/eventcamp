import React, { PureComponent, Fragment } from 'react';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../store';
import { request } from '../../api';
import { categories, defaultTopic } from '../../fixtures';
import { filterRecources } from '../../resources';
import { globalRecources } from '../../resources/global';
import { getHistoryUrl } from '../../helper';

class CategoryField extends Component {
  state = {
    topics: defaultTopic,
    currentTheme: '',
  };

  componentDidMount() {
    const {
      categories: category,
      topics: topic,
    } = this.props;

    if (category) {
      this.setState({
        topics: categories.find(cat => cat.id === category).subcat,
        currentTheme: topic || '',
      });
    }
  }

  changeCategory = (selection) => {
    const { history } = this.props;

    this.changeSelection('categories', selection);
    this.setState({ currentTheme: defaultTopic });

    history.push(getHistoryUrl('categories', selection, ''));
  };

  changeSelection = (type, selection) => {
    const params = !selection ? { [type]: '' } : { [selection.type]: selection ? selection.value : '' };

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
          type: 'UPDATE_FILTER_CITY',
          cities: params['categories'],
        });

        const activeCategory = categories.find(cat => cat.id === data[filterOption]);

        if (activeCategory) {
          this.setState({ topics: activeCategory.subcat });
        }

        return params;
      });
  };
  
  render() {
    const { categories: catFilter } = this.props;
    const { topics, currentTheme } = this.state;

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
  return {
    posts: storeData.filterState.list,
    categories: storeData.filterState.categories,
    topics: storeData.filterState.topics,
  };
};

export default withRouter(connect(mapStateToProps)(CategoryField));
