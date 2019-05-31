import moment from 'moment';
import { stateToHTML } from 'draft-js-export-html';
import { cities } from '../../fixtures';
import { urlRecources } from '../../resources/url';
import { getValueFromParams } from '../../helper';
import { parseJSON, stringifyJSON } from '../../helper/json';
import store from '../../store';

export const getRequestUrl = (param) => {
  const filterOption = Object.keys(param)[0];
  let url = `${urlRecources.endpointUrl}posts?`;
  if ('author' in param) {
    const authorID = param.author;
    url = `${url}&author=${authorID}`;
    return url;
  }
  const prevFilterState = store.getState().filterState;

  const dateFrom = (prevFilterState.range && prevFilterState.range.from)
    ? prevFilterState.range.from : moment(new Date()).format('YYYY-MM-DDT00:00:00');
  const dateTo = (prevFilterState.range && prevFilterState.range.to)
    ? prevFilterState.range.from : false;

  const query = {
    categories: (filterOption === 'categories') ? param.categories : prevFilterState.categories,
    topics: (filterOption === 'topics') ? param.topics : prevFilterState.topics,
    cities: (filterOption === 'cities') ? param.cities : prevFilterState.cities,
    from: (filterOption === 'from') ? moment(param.from).format('YYYY-MM-DDT00:00:00') : dateFrom,
    to: (filterOption === 'from') ? moment(param.to).format('YYYY-MM-DDT00:00:00') : dateTo,
    page: (filterOption === 'page') ? param.page : '1',
  };
  const city = cities.find(item => item.id === query.cities);

  if (query.categories) url = `${url}&categories=${query.categories}`;
  if (query.cities) url = `${url}&filter[meta_query][0][key]=cities&filter[meta_query][0][value]=${city.url}`;
  if (query.from && query.from === query.to) {
    url = `${url}&filter[meta_query][1][key]=dateOf&filter[meta_query][1][value]=${query.from.replace('T00:00:00', '')}`;
  } else if (query.from) {
    url = `${url}&filter[meta_query][1][key]=dateOf&filter[meta_query][1][value]=${query.from}&filter[meta_query][1][compare]=>`;
  }
  if (query.to && query.from !== query.to) url = `${url}&filter[meta_query][2][key]=dateOf&filter[meta_query][2][value]=${query.to}&filter[meta_query][2][compare]=<`;
  if (query.topics) url = `${url}&filter[meta_query][3][key]=topic&filter[meta_query][3][value]=${query.topics}`;
  if (query.page) url = `${url}&page=${query.page}`;
  return url;
};

export const getInterestingUrl = (param, isTagActive) => {
  const tagCommon = param.acf.tags && isTagActive ? param.acf.tags.split(',')[0] : false;
  let url = `${urlRecources.endpointUrl}posts?`;

  if (param.categories.length) {
    url = `${url}&categories=${param.categories[0]}`;
  }

  if (param.acf.cities) {
    url = `${url}&filter[meta_query][0][key]=cities&filter[meta_query][0][value]=${param.acf.cities}`;
  }

  url = `${url}&filter[meta_query][1][key]=dateOf&filter[meta_query][1][value]=${moment(new Date()).format('YYYY-MM-DDT00:00:00')}&filter[meta_query][1][compare]=>`;

  if (tagCommon) {
    url = `${url}&search=${tagCommon}`;
  }

  return `${url}&per_page=3`;
};

export const getLastPostsUrl = () => {
  const dateFrom = moment(new Date()).format('YYYY-MM-DDT00:00:00');
  let url = `${urlRecources.endpointUrl}posts?`;
  url = `${url}&filter[meta_query][1][key]=dateOf&filter[meta_query][1][value]=${dateFrom}&filter[meta_query][1][compare]=>`;
  return `${url}&per_page=5`;
};

export const fetchData = (url, params) => {
  const necessaryParams = params || { method: 'GET' };

  return fetch(url, necessaryParams)
    .then(response => response.json());
};

export const authFetch = param => fetch(urlRecources.jwtRegister, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
  body: JSON.stringify({
    username: param.login,
    password: param.password,
    jwt_auth_expire: '10',
  }),
}).then(response => response.json());


export const eventRequest = (param, imageID, userData) => {
  const {
    editorState,
    title: displayTitle,
    price: priceValue,
    currency: currencyValue,
    category,
    tags: topicTags,
    city,
    address,
    date,
    time: eventTime,
    currentTheme,
    register,
    phone,
    email,
    eventID = null,
  } = param;
  const description = stateToHTML(editorState.getCurrentContent());
  const { token } = parseJSON(userData);
  const url = `${urlRecources.endpointUrl}posts/${eventID || ''}`;
  const cityValue = getValueFromParams(cities, city, 'id', 'url');

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: stringifyJSON({
      title: displayTitle,
      content: description,
      featured_media: imageID,
      categories: category,
      fields: {
        topic: currentTheme.value,
        cities: cityValue,
        picture: imageID,
        price: priceValue,
        location: address,
        dateOf: date,
        currency: currencyValue,
        tags: topicTags,
        time: eventTime,
        register,
        phone,
        email,
      },
    }),
  }).then(response => response.json());
};
