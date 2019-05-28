import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import 'react-select/dist/react-select.css';
import store from '../../store';
import { request } from '../../api';
import { categories, cities, defaultTopic } from '../../fixtures';
import { filterRecources } from '../../resources';
import { globalRecources } from '../../resources/global';
import { getValueFromParams } from '../../helper';

class SelectFilter extends Component {
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

  changeCity = (selection) => {
    this.changeSelection('cities', selection);
    this.addToHistory('cities', selection);
  };

  changeCategory = (selection) => {
    this.changeSelection('categories', selection);
    this.setState({ currentTheme: defaultTopic });
    this.addToHistory('categories', selection);
  };

  changeTopic = (selection) => {
    this.changeSelection('topics', selection);
    this.setState({ currentTheme: selection || defaultTopic });
    this.addToHistory('topics', selection);
  };

  changeSelection = (type, selection) => {
    let params = {};
    if (!selection) {
      params = { [type]: '' };
    } else {
      params = { [selection.type]: selection ? selection.value : '' };
    }

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

  addToHistory = (type, selection) => {
    const { topics } = this.state;
    let data;
    switch (type) {
      case 'categories':
        data = { name: 'categories', values: categories };
        break;
      case 'cities':
        data = { name: 'cities', values: cities };
        break;
      case 'topics':
        data = { name: 'topics', values: topics };
        break;
      default:
        console.log("Error. Type wasn't found");
        return;
    }
    //  adding history
    const {
      categories: catFilter,
      cities: cityFilter,
    } = this.props;
    const status = {
      categories: catFilter ? getValueFromParams(categories, catFilter[0], 'id', 'url') : '',
      cities: cityFilter ? getValueFromParams(cities, cityFilter[0], 'id', 'url') : '',
    };

    status[data.name] = getValueFromParams(data.values, selection ? selection.value : '', 'id', 'url');

    const selectCity = status.cities.length ? status.cities : 'any';
    const url = `/events/${selectCity}/${status.categories}`;

    history.pushState(window.location.origin, '', url);
  }

  render() {
    const {
      categories: catFilter,
      cities: cityFilter,
    } = this.props;
    const { topics, currentTheme } = this.state;

    return (
      <div className="event-filter-option">
        <p>{filterRecources.city}</p>
        <Select
          name="form-field-cities"
          label="cities"
          options={cities.map(city => ({
            label: city.name,
            value: city.id,
            type: 'cities',
          }))}
          value={cityFilter}
          onChange={this.changeCity}
        />
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
      </div>
    );
  }
}

const mapStateToProps = (storeData) => {
  return {
    posts: storeData.filterState.list,
    categories: storeData.filterState.categories,
    topics: storeData.filterState.topics,
    cities: storeData.filterState.cities,
  };
};

export default connect(mapStateToProps)(SelectFilter);
