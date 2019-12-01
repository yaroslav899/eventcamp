import React, { PureComponent, Fragment } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { updateEventList, updateFilterTopic } from '../../redux/actions/filterActions';
import { updateActivePage } from '../../redux/actions/paginationActions';
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
    const categoryTopics = activeCategory ? activeCategory.subcat : defaultTopic;

    this.setState({
      topics: categoryTopics,
      currentTheme: topic || '',
    });
  }

  componentDidUpdate(prevProps) {
    const { categories: prevCategoryID } = prevProps;
    const { categories: categoryID, topics: topic, updateTopic } = this.props;

    if (prevCategoryID !== categoryID || !categoryID) {
      const activeCategory = categories.find(cat => cat.id === categoryID);
      const categoryTopics = activeCategory ? activeCategory.subcat : defaultTopic;

      updateTopic(null);

      this.setState({
        topics: categoryTopics,
        currentTheme: topic || '',
      });
    }
  }

  changeTopic = (selection) => {
    this.changeSelection('topics', selection);
    this.setState({ currentTheme: selection || '' });
  };

  changeSelection = (type, selection) => {
    const params = !selection ? { [type]: '' } : { [selection.type]: selection ? selection.value : '' };
    const { defaultPage, updateEvents, updateTopic, updateActivePage } = this.props;

    updateActivePage(defaultPage);

    return request.getListPosts(params)
      .then((posts) => {
        if (!posts.length) {
          posts.push({ empty: globalRecources.noFilterResult });
        }

        updateEvents(posts);
        updateTopic(params.topics);

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

function mapStateToProps(store) {
  return {
    categories: store.filterState.categories,
    topics: store.filterState.topics,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateEvents: posts => dispatch(updateEventList(posts)),
    updateTopic: topics => dispatch(updateFilterTopic(topics)),
    updateActivePage: page => dispatch(updateActivePage(page)),
  };
}

TopicField.defaultProps = { defaultPage: '1' };

export default connect(mapStateToProps, mapDispatchToProps)(TopicField);
