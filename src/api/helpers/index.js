import {cities} from '../../fixtures';
import {endpointUrl} from '../../urls';
import moment from 'moment';
import store from '../../store';

export const getRequestUrl = param => {
    let filterOption = Object.keys(param)[0];
    let prevFilterState = store.getState().filterState;

    let dateFrom = prevFilterState.range && prevFilterState.range.from ? prevFilterState.range.from : moment(new Date()).format('YYYY-MM-DDT00:00:00');
    let dateTo = prevFilterState.range && prevFilterState.range.to ? prevFilterState.range.from : false;

    let query = {
        categories : (filterOption === 'categories') ? param.categories : prevFilterState.categories,
        cities :  (filterOption === 'cities') ? param.cities : prevFilterState.cities,
        from: (filterOption === 'from') ?  moment(param.from).format('YYYY-MM-DDT00:00:00') : dateFrom,
        to: (filterOption === 'from') ?    moment(param.to).format('YYYY-MM-DDT00:00:00') : dateTo,
        page : (filterOption === 'page') ? param.page : '1'
    };
    let url = endpointUrl + 'posts?';
    let city = cities.filter(city => city.id === query.cities);
    if (query.categories) url = url + '&categories=' + query.categories;
    if (query.cities) url = url + '&filter[meta_query][0][key]=cities&filter[meta_query][0][value]=' + city[0].name;
    if (query.from) url = url + '&filter[meta_query][1][key]=dateOf&filter[meta_query][1][value]=' + query.from + '&filter[meta_query][1][compare]=>';
    if (query.to) url = url + '&filter[meta_query][2][key]=dateOf&filter[meta_query][2][value]=' + query.to + '&filter[meta_query][2][compare]=<';
    if (query.page) url = url + '&page=' + query.page;
    return url;
};

export const getInterestingUrl = param => {
    let tagCommon = param.acf.tags ? param.acf.tags.split(',')[0] : false;
    let url = endpointUrl + 'posts?';
    if (param.categories.length && param.categories[0]) url = url + '&categories=' + param.categories[0];
    if (param.acf.cities) url = url + '&filter[meta_query][0][key]=cities&filter[meta_query][0][value]=' + param.acf.cities;
    url = url + '&filter[meta_query][1][key]=dateOf&filter[meta_query][1][value]=' + moment(new Date()).format('YYYY-MM-DDT00:00:00') + '&filter[meta_query][1][compare]=>';
    if (tagCommon) url = url + '&search=' + tagCommon;
    url = url + "&per_page=" + 3;
    return url;
};

export const getLastPosts = param => {
    let dateFrom = moment(new Date()).format('YYYY-MM-DDT00:00:00');
    let url = endpointUrl + 'posts?';
    url = url + '&filter[meta_query][1][key]=dateOf&filter[meta_query][1][value]=' + dateFrom + '&filter[meta_query][1][compare]=>';
    url = url + "&per_page=" + 5;
    return url;
};