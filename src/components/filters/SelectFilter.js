import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {categories, cities} from '../../fixtures';
import store from '../../store'
import {request} from '../../api';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

class SelectFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            themes: [{
                "id": "999",
                "url": "no_choice",
                "name": "Выберите категорию"
            }],
            currentTheme : ''
        };
    }

    componentDidMount() {
        const initialParams = this.props;
        var g = 0;
    }

    render() {
        return (
            <div className="event-filter-option">
                <p>Город</p>
                <Select
                    name="form-field-cities"
                    label="cities"
                    options={cities.map(city =>({
                                label : city.name,
                                value : city.id,
                                type : 'cities'
                            }))}
                    value={this.props.cities}
                    onChange={this.changeCity}
                />
                <p>Категория</p>
                <Select
                        name="form-field-category"
                        label="categories"
                        options={categories.map(category =>({
                                    label : category.name,
                                    value : category.id,
                                    type : 'categories'
                                }))}
                        value={this.props.categories}
                        onChange={this.changeCategory}
                />
                <p>Тема</p>
                <Select
                    name="form-field-themes"
                    label="themes"
                    options={this.state.themes.map(theme =>({
                                label : theme.name,
                                value : theme.id,
                                type : 'themes'
                            }))}
                    value={this.state.currentTheme}
                    onChange={this.changeTheme}
                />
            </div>
        )
    }

    changeCity = selection => {
        this.changeSelection('cities', selection);
        this.addToHistory('cities', selection);
    };

    changeCategory = selection => {
        this.changeSelection('categories', selection);
        this.addToHistory('categories', selection);
    };

    changeTheme = selection => {
        let params = {};
        var param = this.state.themes.filter(function(theme){
            return theme.name === selection.label;
        });
        if (selection) {
            this.setState({
                currentTheme: selection
            });
        } else {
            this.setState({
                currentTheme: ''
            });
        }
    };

    changeSelection = (type, selection)=> {
        let params = {};
        if (!selection) {
            params = {type : ''};
        } else {
            params = {[selection.type] : selection ? selection.value : ''};
        }
        request.getListPosts(params)
            .then(posts => {
                store.dispatch({
                    type: 'EVENT_LIST_UPDATE',
                    list: posts
                });
                return params;
            })
            .then(data => {
                let filterOption = Object.keys(data)[0];
                switch (filterOption) {
                    case 'categories':
                        store.dispatch({
                            type: 'UPDATE_FILTER_CATEGORY',
                            categories: data[filterOption]
                        });
                        let themes = categories.filter(function(cat){
                            if (cat.id === data[filterOption]){
                                return cat;
                            }
                        });
                        this.setState({
                            themes: themes[0].subcat
                        });
                        break;
                    case 'cities':
                        store.dispatch({
                            type: 'UPDATE_FILTER_CITY',
                            cities: data[filterOption]
                        });
                        break;
                    default:
                        console.log("Error. Filter option wasn't found");
                        break;
                }
                return data;
            })
    };

    addToHistory = (type, selection) => {
        let data;
        switch (type) {
            case 'categories':
                data = {name: 'categories', values :categories };
                break;
            case 'cities':
                data = {name: 'cities', values :cities };
                break;
            default:
                console.log("Error. Type wasn't found");
                return;
        }
        //adding history
        let name = data.name;

        let state = {
            'categories': this.props.categories ? getParamsValue(categories, this.props.categories) : '',
            'cities': this.props.cities ? getParamsValue(cities, this.props.cities) : ''
        };

        state[name] = getParamsValue(data.values, selection ? selection.value : '');
        let url = '/' + (state.cities.length ? state.cities : 'any') + '/' + state.categories;
        history.pushState(window.location.origin, '', url);
    }
}
const mapStateToProps = function(store) {
    return {
        posts   : store.filterState.list,
        categories : store.filterState.categories,
        cities : store.filterState.cities
    }
};

const getParamsValue = function(data, id){
    var currentCategory = data.filter(function(item){
        return (item.id == id[0])
    });
    return currentCategory[0].url
};

export default connect(mapStateToProps)(SelectFilter);