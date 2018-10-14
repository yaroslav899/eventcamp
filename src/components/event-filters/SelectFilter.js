import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import 'react-select/dist/react-select.css';
import store from '../../store';
import { request } from '../../api';
import { categories, cities } from '../../fixtures';
import { filterRecources } from '../../recources';
import { getValueFromParams } from '../../helper';

const defaultTopic = [{
  id: '999',
  url: 'no_choice',
  name: 'Выберите категорию',
}];

class SelectFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themes: defaultTopic,
      currentTheme: '',
    };
  }

  changeCity = (selection) => {
    this.changeSelection('cities', selection);
    this.addToHistory('cities', selection);
  };

  changeCategory = (selection) => {
    this.changeSelection('categories', selection);
    if (!selection) {
      this.setState({
        themes: defaultTopic,
      });
    }
    this.addToHistory('categories', selection);
  };

  changeTheme = (selection) => {
    const { themes } = this.state;
    if (selection) {
      const param = themes.filter(theme => theme.name === selection.label);
    }

    this.setState({
      currentTheme: selection || defaultTopic,
    });
  };

  changeSelection = (type, selection) => {
    let params = {};
    if (!selection) {
      params = { [type]: '' };
    } else {
      params = { [selection.type]: selection ? selection.value : '' };
    }
    request.getListPosts(params)
      .then((posts) => {
        store.dispatch({
          type: 'EVENT_LIST_UPDATE',
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
            this.setState({
              themes: categories.find(cat => cat.id === data[filterOption]).subcat,
            });
            break;
          case 'cities':
            store.dispatch({
              type: 'UPDATE_FILTER_CITY',
              cities: data[filterOption],
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
    let data;
    switch (type) {
      case 'categories':
        data = { name: 'categories', values: categories };
        break;
      case 'cities':
        data = { name: 'cities', values: cities };
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
    const {
      themes,
      currentTheme,
    } = this.state;
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
          name="form-field-themes"
          label="themes"
          options={themes.map(theme => ({
            label: theme.name,
            value: theme.id,
            type: 'themes',
          }))}
          value={currentTheme}
          onChange={this.changeTheme}
        />
      </div>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    posts: store.filterState.list,
    categories: store.filterState.categories,
    cities: store.filterState.cities,
  };
};

export default connect(mapStateToProps)(SelectFilter);
