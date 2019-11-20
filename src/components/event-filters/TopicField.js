import React, { PureComponent, Fragment } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import store from '../../store';
import { request } from '../../api';
import { categories, defaultTopic } from '../../fixtures';
import { filterRecources } from '../../resources';
import { globalRecources } from '../../resources/global';

class TopicField extends PureComponent {
  state = {
    topics: defaultTopic,
    currentTheme: '',
  };

  componentDidMount() {
    const { categories: categoryID, topics: topic } = this.props;

    if (!categoryID) {
      return false;
    }

    const activeCategory = categories.find(cat => cat.id === categoryID);
    const categoryTopics = activeCategory.subcat;

    this.setState({
      topics: categoryTopics,
      currentTheme: topic || '',
    });
  }

  componentDidUpdate(prevProps) {
    const { categories: prevCategoryID } = prevProps;
    const { categories: categoryID, topics: topic } = this.props;

    if (prevCategoryID === categoryID || !categoryID) {
      return false;
    }

    const activeCategory = categories.find(cat => cat.id === categoryID);
    const categoryTopics = activeCategory.subcat;

    this.setState({
      topics: categoryTopics,
      currentTheme: topic || '',
    });
  }

  changeTopic = (selection) => {
    this.changeSelection('topics', selection);
    this.setState({ currentTheme: selection || defaultTopic });
  };

  changeSelection = (type, selection) => {
    const params = !selection ? { [type]: '' } : { [selection.type]: selection ? selection.value : '' };
    params.page = '1';

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
          type: 'UPDATE_FILTER_TOPIC',
          topics: params['topics'],
        });

        return params;
      });
  };

  render() {
    const { topics, currentTheme } = this.state;

    return (
      <Fragment>
        <p>{filterRecources.topic}</p>
        <Select
          name="form-field-topics"
          label="topics"
          options={topics.map(topic => ({
            label: topic.name,
            value: topic.url,
            type: 'topics',
          }))}
          value={currentTheme}
          onChange={this.changeTopic}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (storeData) => {
  return {
    categories: storeData.filterState.categories,
    topics: storeData.filterState.topics,
  };
};

export default connect(mapStateToProps)(TopicField);
