import React, { PureComponent, Fragment } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import store from '../../store';
import { request } from '../../api';
import { categories, defaultTopic } from '../../fixtures';
import { filterRecources } from '../../resources';
import { globalRecources } from '../../resources/global';
import { getHistoryUrl } from '../../helper';

class TopicField extends PureComponent {
  state = {
    topics: defaultTopic,
    currentTheme: '',
  };

  componentDidMount() {
    const { categories: category, topics: topic } = this.props;

    if (category) {
      this.setState({
        topics: categories.find(cat => cat.id === category).subcat,
        currentTheme: topic || '',
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      const { categories: category, topics: topic } = this.props;

      if (category) {
        this.setState({
          topics: categories.find(cat => cat.id === category).subcat,
          currentTheme: topic || '',
        });
      }
  }

  changeTopic = (selection) => {
    this.changeSelection('topics', selection);
    this.setState({ currentTheme: selection || defaultTopic });
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
          type: 'UPDATE_FILTER_TOPIC',
          cities: params['topics'],
        });

        return params;
      });
  };

  render() {
    const {
      categories: catFilter,
      cities: cityFilter,
    } = this.props;
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
