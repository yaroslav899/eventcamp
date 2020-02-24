import React, { PureComponent, Fragment } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { withTranslation } from 'react-multi-lang';
import { updateFilterTopic } from '../../redux/actions/eventActions';
import { updateActivePage } from '../../redux/actions/paginationActions';
import { fetchEventList } from '../../api';
import { categories, defaultTopic } from '../../fixtures';

class TopicField extends PureComponent {
  state = {
    topics: defaultTopic,
    currentTheme: '',
  };

  componentDidMount() {
    const { categoryValue, topicValue } = this.props;

    if (!categoryValue) {
      return false;
    }

    const activeCategory = categories.find(category => category.id === categoryValue);
    const categoryTopics = activeCategory ? activeCategory.subcat : defaultTopic;

    this.setState({
      topics: categoryTopics,
      currentTheme: topicValue || '',
    });
  }

  componentDidUpdate(prevProps) {
    const { categoryValue: prevCategoryValue } = prevProps;
    const { categoryValue, topicValue, updateTopic } = this.props;

    if (prevCategoryValue !== categoryValue || !categoryValue) {
      const activeCategory = categories.find(category => category.id === categoryValue);
      const categoryTopics = activeCategory ? activeCategory.subcat : defaultTopic;

      updateTopic(null);

      this.setState({
        topics: categoryTopics,
        currentTheme: topicValue || '',
      });
    }
  }

  changeTopic = (selection) => {
    const params = !selection ? { ['topics']: '' } : { [selection.type]: selection ? selection.value : '' };
    const { defaultPage, updateTopic, updateActivePage, fetchEventList } = this.props;

    return new Promise(resolve => resolve(this.setState({ currentTheme: selection || '' })))
      .then(() => updateTopic(params.topics))
      .then(() => updateActivePage(defaultPage))
      .then(() => fetchEventList(params));
  };

  render() {
    const { topics, currentTheme } = this.state;
    const { t } = this.props;

    return (
      <Fragment>
        <Select
          name="form-field-topics"
          label="topics"
          placeholder={t('filter.placeholder.topic')}
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
    categoryValue: store.eventState.categories,
    topicValue: store.eventState.topics,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateTopic: topics => dispatch(updateFilterTopic(topics)),
    updateActivePage: page => dispatch(updateActivePage(page)),
    fetchEventList: params => dispatch(fetchEventList(params)),
  };
}

TopicField.defaultProps = { defaultPage: '1' };

export default withTranslation(connect(mapStateToProps, mapDispatchToProps)(TopicField));
