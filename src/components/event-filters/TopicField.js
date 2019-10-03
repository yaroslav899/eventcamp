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

class TopicField extends Component {
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

  changeTopic = (selection) => {
    this.changeSelection('topics', selection);
    this.setState({ currentTheme: selection || defaultTopic });
    this.addToHistory('topics', selection);
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

        return params;
      })
      .then((data) => {
        const filterOption = Object.keys(data)[0];
        switch (filterOption) {
          case 'categories':
            store.dispatch({
              type: 'UPDATE_FILTER_CATEGORY',
              categories: data[filterOption],
            });

            const activeCategory = categories.find(cat => cat.id === data[filterOption]);

            if (activeCategory) {
              this.setState({ topics: activeCategory.subcat });
            }

            break;
          case 'cities':
            store.dispatch({
              type: 'UPDATE_FILTER_CITY',
              cities: data[filterOption],
            });
            break;
          case 'topics':
            store.dispatch({
              type: 'UPDATE_FILTER_TOPIC',
              topics: data[filterOption],
            });
            break;
          default:
            console.log("Error. Filter option wasn't found");
            break;
        }

        return data;
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

export default withRouter(connect(mapStateToProps)(SelectFilter));
