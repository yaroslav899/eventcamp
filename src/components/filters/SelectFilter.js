import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css'
import store from '../../store'
import { request } from '../../api';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { categories, cities } from '../../fixtures';
import { filterRecources } from '../../recources';
import { getValueFromParams } from '../../helper';
const defaultTopic = [{
    "id": "999",
    "url": "no_choice",
    "name": "Выберите категорию"
}];

class SelectFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            themes: defaultTopic,
            currentTheme : ''
        };
    }

    render() {
        return (
            <div className="event-filter-option">
                <p>{filterRecources.city}</p>
                <Select name="form-field-cities"
                        label="cities"
                        options={cities.map(city =>({
                                label : city.name,
                                value : city.id,
                                type : 'cities'
                            }))}
                        value={this.props.cities}
                        onChange={this.changeCity}
                />
                <p>{filterRecources.category}</p>
                <Select name="form-field-category"
                        label="categories"
                        options={categories.map(category =>({
                                    label : category.name,
                                    value : category.id,
                                    type : 'categories'
                                }))}
                        value={this.props.categories}
                        onChange={this.changeCategory}
                />
                <p>{filterRecources.topic}</p>
                <Select name="form-field-themes"
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
        if (!selection) {
            this.setState({
                themes: defaultTopic
            });
        }
        this.addToHistory('categories', selection);
    };

    changeTheme = selection => {
        if (selection) {
                let param = this.state.themes.filter(function(theme){
                return theme.name === selection.label;
            });
        }
        
        this.setState({
            currentTheme: selection || defaultTopic
        });
    };

    changeSelection = (type, selection)=> {
        let params = {};
        if (!selection) {
            params = {[type] : ''};
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
                        let theme = categories.find(cat => cat.id === data[filterOption]);
                        this.setState({
                            themes: theme.subcat
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
        let status = {
            'categories': this.props.categories ? getValueFromParams(categories, this.props.categories[0], 'id', 'url') : '',            
            'cities': this.props.cities ? getValueFromParams(cities, this.props.cities[0], 'id', 'url') : ''
        };
        status[data.name] = getValueFromParams(data.values, selection ? selection.value : '', 'id', 'url');        
        let url = '/events/' + (status.cities.length ? status.cities : 'any') + '/' + status.categories;
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

export default connect(mapStateToProps)(SelectFilter);